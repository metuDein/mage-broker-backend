const { logEvents } = require('./logEvents');


const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}:${err.message}`, 'errLog.txt')
    console.log(`${err.name}:${err.message}`)
    res.send(err.message);
    res.status(500)
}

module.exports = { errorHandler }