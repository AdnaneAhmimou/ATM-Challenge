const log = require('../logs/logs');
const Database =require('../database/Database');



//const trandb = new Database('../database/transactions.json');
//const userdb = new Database('../database/users.json');

class Transaction {
    static latesttransactionID = 84;
    constructor( sourceUser, destinationUser, amount) {
        var trandb = new Database('../database/transactions.json');
        let id=Math.floor(Math.random() * 900000) + 100000;
        while(trandb.exist(id)){
            id=Math.floor(Math.random() * 900000) + 100000;
        }
        this.ID = id;
        this.sourceAccountID = sourceAccountID;
        this.destinationAccountID = destinationAccountID;
        this.amount = amount;
        this.date = date;
        sourceUser.balance -= amount;
        destinationUser.balance += amount;
        var userdb = new Database('../database/users.json');
        userdb.updateUser(sourceUser);
        userdb.updateUser(destinationUser);
        
        trandb.add(this);

    }

    // Getter methods
    getTransactionID() {
        return this.transactionID;
    }

    getSourceAccountID() {
        return this.sourceAccountID;
    }

    getDestinationAccountID() {
        return this.destinationAccountID;
    }

    getAmount() {
        return this.amount;
    }

    getDate() {
        return this.date;
    }

}