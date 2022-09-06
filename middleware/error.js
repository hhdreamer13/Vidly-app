const winston = require('winston');

const wLogger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});



function error (err, req, res, next) {
    wLogger.error(err.message, err);

    // error
    // warn
    // info
    // verbose
    // debug
    // silly


    res.status(500).send('Something failed.');
}

module.exports = error;