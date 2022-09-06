const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');


module.exports = function() {
    const db = config.get('db');
    mongoose.connect(db)
        // .then(() => console.log('Connected to MongoDB...'))
        .then(() => winston.info(`Connected to ${db}...`))
        // .catch((err) => console.log('Could not connect to MongoDb...', err)); // on le supprime pour que le handler global s'en occupe et le logger dans le log
}