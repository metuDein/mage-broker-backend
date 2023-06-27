const { v4 : uuid }  = require('uuid');
const { format } = require('date-fns');
const path = require('path');
const fs = require('fs')
const fsPromises = require('fs').promises


const logEvents = async (message, logFIle) => {
    const date = format(new Date(), 'yyyy-MM-dd\tHH:mm:ss');
    const logItem = `${date}\t${uuid()}\t${message}\n`;

    try {
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))){

            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))

        } 
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFIle), logItem);
    } catch (error) {
        console.log(error)
    }
}

const logger = (req, res, next) => {
        logEvents(`${req.method}\t${req.path}\t${req.headers}`, 'reqlog.txt');
        console.log(`${req.method}\t${req.path}\t${req.origin}`);
        next()
}

module.exports = {
    logEvents,
    logger
}