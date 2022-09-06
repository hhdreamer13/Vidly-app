require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const error = require('./middleware/error')
const config = require('config');
const Joi = require('joi');
// Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const { required } = require('joi');

// it is necessary to put this in the logger.js
const wLogger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

process.on('uncaughtException', (ex) => {
    wLogger.error(ex.message, ex);
    process.exit(1);
});

process.on('unhadledRejection', (ex) => {
    // wLogger.error(ex.message, ex);
    // process.exit(1);
    throw ex; // because this will throw an exception and winston will catch it
});

// winston.handleExceptions(
//     new winston.transports.File({ filename: 'uncaughtExceptions.log'})
// );
winston.exceptions.handle(
    new winston.transports.File({ filename: 'uncaughtExceptions.log'})
);




// winston.add(new winston.transports.MongoDB, { db: 'mongodb://localhost/vidly' });

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

mongoose.connect('mongodb://127.0.0.1/vidly')
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.log('Could not connect to MongoDb...', err));

app.use(express.json()); // parses and if there are json => req.body
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.use(error);


// app.get('/', (req, res) => {
//     res.send('Welcome to our genres api')
// });

