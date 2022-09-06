const Joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema} = require('./genre');

const Movie = mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        // trime: true,
        maxlength: 50
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        require: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        require: true,
        min: 0,
        max: 255
    }
}));

// Joi new documentation
function validateMovie(movie) {
    const schema = Joi.object({
        title: Joi.string().required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    });
    return schema.validate(movie);

}

// Mongo Schema


module.exports.Movie = Movie;
exports.validate = validateMovie