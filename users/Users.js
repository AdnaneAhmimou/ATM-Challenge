const log = require('../logs/logs');
const { hash} = require('../crypto/md5hash');
const database =require('../database/Database');
const Transaction=require('../transactions/Transactions')

const userdb = new database('../database/users.json');
class Users {
    static latestuserID = 100;
    constructor( name, pin, balance=0) {
        let i = Users.latestuserID++
        let id=Math.floor(Math.random() * 900000) + 100000;
        while(userdb.exist(id)){
            id=Math.floor(Math.random() * 900000) + 100000;
        }
        this.ID = id;
        this.name = name;
        this.pin = hash(pin);
        this.balance = balance;
        
        
    }

    // Getter methods
    getID() {
        return this.ID;
    }

    getName() {
        return this.name;
    }

    getBalance() {
        return this.balance;
    }
    createUser(){
        
        userdb.add(this);
        Users.latestuserID++
        log(`User with ID: ${this.ID}, name: ${this.name} has been created.`,'../logs/accounts.txt');
    }

    // Method to deposit money into the account
    deposit(amount) {
        this.balance += amount;
        return this.balance;
    }

    // Method to withdraw money from the account
    withdraw(amount) {
        if (amount > this.balance) {
            log(`User with ID: ${this.ID}, name: ${this.name} ,withdraw ${amount} unsuccessfully (Insufficient funds)`,'accounts.txt');
            return "Insufficient funds";
        }
        this.balance -= amount;
        userdb.updateUser(this);
        log(`User with ID: ${this.ID}, name: ${this.name} ,withdraw ${amount} successfully`,'accounts.txt');
        return this.balance;
    }

    send(amount,destinationUser) {
        if (amount > this.balance) {
            log(`User with ID: ${this.ID}, name: ${this.name} ,send ${amount} unsuccessfully (Insufficient funds)`,'accounts.txt');
            return "Insufficient funds";
        }
        const transaction=new Transaction(this,destinationUser,amount)
        
        log(`User with ID: ${this.ID}, name: ${this.name} ,withdraw ${amount} successfully`,'accounts.txt');
        return this.balance;
    }

    // Method to change the PIN
    changePIN(newPIN,oldpin) {
        if(hash(oldpin)!=hash(this.pin)){
            log(`User with ID: ${this.ID}, name: ${this.name} pin changed attempt unsuccessfully.`,'accounts.txt');
            return "PIN change error";
        }
        this.pin = hash(newPIN);
        userdb.updateUser(this);
        log(`User with ID: ${this.ID}, name: ${this.name} pin has been changed.`,'accounts.txt');
        return "PIN changed successfully";
            
    }
}
/*console.log('id : '+Users.latestuserID);
var user = new Users('test','jknsxj',2334);
console.log('id : '+Users.latestuserID)
var user1 = new Users('tesvvt','jknsvvxj',234);
user.createUser();
user1.createUser();*/
module.exports = Users;