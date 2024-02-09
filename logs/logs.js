const fs = require('fs');
const path = require('path');

// Function to log messages to a text file
function log(message,logFile) {
    const logFilePath = path.join(__dirname, logFile);
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp}: ${message}\n`;
    
    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
}

module.exports = log;