const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');


module.exports = function() {
        // it is necessary to put this in the logger.js
    const wLogger = winston.createLogger({
        transports: [
            new winston.transports.Console({ colorize: true, prettyPrint: true }),
            new winston.transports.File({ filename: 'combined.log' })
        ]
    });

    // winston.handleExceptions(
    //     new winston.transports.File({ filename: 'uncaughtExceptions.log'})
    // );
    winston.exceptions.handle(
        new winston.transports.File({ filename: 'uncaughtExceptions.log'})
    );

    process.on('uncaughtException', (ex) => {
        wLogger.error(ex.message, ex);
        process.exit(1);
    });

    process.on('unhadledRejection', (ex) => {
        // wLogger.error(ex.message, ex);
        // process.exit(1);
        throw ex; // because this will throw an exception and winston will catch it
    });
}