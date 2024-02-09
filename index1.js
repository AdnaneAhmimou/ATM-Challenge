const readlineSync = require('readline-sync');
const Database = require('./database/Database');
const Users = require('./users/Users');


var User = null;
var db = new Database('/home/elidrissi/Videos/arkx/ATM/database/users.json');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
function password_check(accountID,db){
    const password = readlineSync.question('Enter your password: ', { hideEchoBack: true });
    let u=db.checkpassword(accountID, password);
    if (u) {
        User = u;
        console.clear();
        displayMenu();
    } else {
        console.clear();
        console.log('Incorrect password. Please try again.');
        return;
    }
}
function login() {
    
    console.log('Login to the Ark_X ATM');
    const accountID = readlineSync.question('Enter your account ID: ');
    const exist=db.searchUserById(accountID);
    
    if (exist) {
        let i=0;
        while(i<3){
            password_check(accountID,db);
            i++;
        }
        console.clear()
        login();
        
    } else {
        
        console.log('User does not exist.');
        
        console.clear();
        login();
    }
}

function createAccount(){
    console.clear()
    console.log('Create your account on Ark_X ATM');
    
    
    const name = readlineSync.question('Your name : ');
    const password = readlineSync.question('Your password : ');
    const balance = readlineSync.question('balence you want to add : ');


    var userc = new Users(name,password,Number.isInteger(balance) && balance>0?balance:0);
    db.add(userc);
    console.clear();
    displayMenu();

}

function displayMenu() {
    console.log('Welcome to the Ark_X ATM');
    console.log('1. Login');
    console.log('2. create account');
    
    const option = parseInt(readlineSync.question('Enter option (1 or 2): '));
    
    performOperation(option);
}

function performOperation(option) {
    switch(option) {
        case 1:
            console.clear();
            login(); // Placeholder, you should retrieve the actual balance from the database
            break;
        case 2:
            createAccount()
            break;
        default:
            console.log('Invalid option');
            console.clear();
            displayMenu();
    }
}

displayMenu();
