const fs = require('fs');
const { hash} = require('../crypto/md5hash');

class Database {
    constructor(filename) {
        this.filename = filename;
        this.table = this.readDataFromFile() || [];
    }

    // Read JSON data from file
    readDataFromFile() {
        try {
            
            const data = require(this.filename);
            return data;
            
        } catch (err) {
            console.error('Error reading file:', err);
            return null;
        }
    }

    // Write JSON data to file
    writeDataToFile() {
        try {
            fs.writeFileSync(this.filename, JSON.stringify(this.table, null, 2));
            console.log('Data written to file successfully.');
        } catch (err) {
            console.error('Error writing to file:', err);
        }
    }

    // Add a new user
    add(user) {
        //console.log("users count :"+this.table.length);
        console.log(this.table[0]['ID']+" : "+user['ID']);
        const existingUser = this.table.some(u => u['ID'] === user['ID']);
        console.log(this.table.length);
        
        if (existingUser) {
            console.error('User with ID', user.id, 'already exists.');
            return;
        }
        
        this.table.push(user);
        this.writeDataToFile();
        
    }
    exist(id){
        /*for(const [_,u] of Object.entries(this.table)){
            if(u["ID"] === id){
                return true;
            }
        }*/
        return this.table.some(u => u['ID']==id);
    }
    checkpassword(id,pass){
        
        /*for(const [_,u] of Object.entries(this.table)){
            if(u["ID"] === id && u["pin"] === hash(pass)){
                return true;
            }
        }*/
        //return this.table.find(u => u['ID']==id && u["pin"] === hash(pass));
        return this.table.some(u => u['ID']==id && u["pin"] === hash(pass));
    }

    // Update an existing user
    updateUser(updatedUser) {
        const index = this.table.findIndex(user => user.id === updatedUser.id);
        if (index !== -1) {
            this.table[index] = updatedUser;
            this.writeDataToFile();
        } else {
            console.error('User with ID', updatedUser.id, 'not found.');
        }
    }

    // Search for a specific user by ID
    searchUserById(userId) {
        return this.table.find(user => user["ID"] == userId)?true:false;
    }
    searchUserByName(name) {
        return this.table.find(user => user.name === name);
    }
}

module.exports = Database;