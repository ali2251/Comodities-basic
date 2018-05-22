contract Storage {
    
    mapping(string => string) comodities;
    mapping(string => strin) loans;
    
    function Storage() {
        
    }
    
    function addComodity(string name, string hash ) external {
        comodities[name] = hash;
    }
    
    function getComodity(string name) view external returns(string) {
        return comodities[name];
    }
    
    function addLoan(string name, string hash ) external {
        loans[name] = hash;
    }
    
    function getLoan(string name) view external returns(string) {
        return loans[name];
    }
    
    
}