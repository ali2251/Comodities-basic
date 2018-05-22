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

let sendingAddress = "0xFd9AFDB4cAc6AAF8CDD0b43b5920ff75E2f4b34b";

let transactionCount = 15 //web3.eth.getTransactionCount(sendingAddress).then(console.log)
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
        let privateKey = new Buffer('e276895231e789fc17420d3aa933ddcf976372bbc2f6b653f759e09b2cb9cbae', 'hex');

        let abiArray = JSON.parse(fs.readFileSync("abiFile.json", 'utf-8'));
        let contract = new web3.eth.Contract(abiArray, contractAddress);

    //     contract.methods.addComodity("testNameWeb3", "testHashweb3")
    //     .send({from: sendingAddress,gasPrice: "0x4E3B29200", gas: 80000, value: "0x0" })
    //     .then(function(receipt){
    //         console.log(receipt);
    // // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
    //     });

    
        let rawTransaction = {
            "from": sendingAddress,
             "nonce": "0x1",
             "gasPrice": web3.utils.numberToHex(web3.utils.toWei('4','gwei')),
             "gasLimit": web3.utils.numberToHex('95000'),
             "to": contractAddress,
             "value": "0x0",
             "data": contract.methods.addComodity("testNameWeb3", "testHashweb3").encodeABI(),
             "chainId": "0x03"
        };
        ++transactionCount;
        let tx = new Tx(rawTransaction);

        tx.sign(privateKey);



        let serializedTx = tx.serialize();



      web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', console.log).catch( (e) => {
          console.log(e)
      })


    }


});

})




