let fs = require('fs');
let ipfs = require('ipfs');
let IPFS = new ipfs();
const Web3 = require('web3');


let web3 = new Web3();
if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    web3.setProvider(new Web3.providers.HttpProvider("https://api.myetherapi.com/rop"));
    //web3.setProvider(new web3.providers.HttpProvider(web3.currentProvider));
    console.log('currProv:')
    console.log(web3.currentProvider)
}

let sendingAddress = "0xC2C8bCdff0DfcBa1137d2C2849c7ea5A7934544e";

let transactionCount = 2 //web3.eth.getTransactionCount(sendingAddress).then(console.log)
let contractAddress = "0xf0750c65582b306c42aafb01fafbed9bf3f583ed";
const Tx = require('ethereumjs-tx');


let someJSON = {
    a : "something",
    b : "something2"
};

IPFS.on('ready', () => {

    IPFS.files.add(someJSON, (err, res) => {
    if (err) console.log(err);
    console.log(res[0].hash);

    if(res[0].hash !== undefined) {
        console.log('here')
        let privateKey = new Buffer('b9d000d8dd06b8e2f863b428a191ed25c5ce8dba6b1f3ed972ab370dc5150ddf', 'hex');

        let abiArray = JSON.parse(fs.readFileSync("abiFile.json", 'utf-8'));
        let contract = web3.eth.contract(abiArray).at(contractAddress);
        let rawTransaction = {
            "from": sendingAddress,
            "nonce": web3.toHex(transactionCount + 2),
            "gasPrice": web3.toHex(21000000000),
            "gasLimit": web3.toHex(80000),
            "to": contractAddress,
            "value": "0x0",
            "data": contract.addComodity.getData("testName", "testHash", {from: sendingAddress}),
            "chainId": 0x03
        };
        ++transactionCount;
        let tx = new Tx(rawTransaction);

        tx.sign(privateKey);



        let serializedTx = tx.serialize();



        web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
            if (!err) {
                console.log(hash);

            } else {
                console.log(err);

            }

        });


    }


});

})




