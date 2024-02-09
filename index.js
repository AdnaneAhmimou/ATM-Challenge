const readline = require('readline');
const Database = require('./database/Database');

var logedUser= null;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var rp = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function loginMenu() {
    console.log('Welcome to the Ark_X ATM');
    
    rl.question('your account id : ', (option) => {
        login(option);
    });
    
}
function login(accountid){
    let db = new Database('./users.json');
    if(db.exist(accountid)){
        rp.question('your password : ', (option) => {
            if (db.checkpassword(accountid,option)){
                logedUser=accountid;
            }else{
                return loginMenu();
            }
            //console.clear();
            displayMenu()
        });
    }
    console.log("user is not exist ");
    sleep(2000);
    //console.clear();
    return loginMenu();
}



// Function to display ATM menu
function displayMenu() {
    console.log('Welcome to the ATM');
    console.log('1. Check Balance');
    console.log('2. Deposit');
    console.log('3. Withdraw');
    console.log('4. Exit');
}

// Function to perform banking operations
function performOperation(option) {
    switch(option) {
        case '1':
            console.log('Your balance is $1000');
            break;
        case '2':
            console.log('Enter deposit amount:');
            break;
        case '3':
            console.log('Enter withdrawal amount:');
            break;
        case '4':
            console.log('Thank you for using the ATM');
            process.exit(0);
        default:
            console.log('Invalid option');
    }
}



// Main function to handle ATM operations
function startATM() {
    displayMenu();
    rl.question('Enter option: ', (option) => {
        performOperation(option);
        startATM(); // Recursive call to keep the ATM running
    });
}

// Start the ATM
loginMenu(); 