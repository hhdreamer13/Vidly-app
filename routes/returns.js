const Joi = require('joi');
const moment = require('moment');
const {Rental} = require('../models/rental');
const {Movie, validate} = require('../models/movie');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');



router.post('/', auth, async (req, res) => {
    // if (!req.body.customerId) return res.status(400).send('customerId not provided'); 
    // if (!req.body.movieId) return res.status(400).send('movieId not provided');
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message);


    const rental = await Rental.findOne({
        'customer._id': req.body.customerId,
        'movie._id': req.body.movieId,
    });

    if (!rental) return res.status(404).send('Renatal not found');

    if (rental.dateReturned) return res.status(400).send('Returned already processed');

    rental.dateReturned = new Date();
    const rentalDays = moment().diff(rental.dateOut, 'days');
    rental.rentalFee =  rentalDays * rental.movie.dailyRentalRate;
    await rental.save();

    await Movie.update({ _id: rental.movie._id }, {
        $inc: { numberInStock: 1 }
    });

    return res.status(200).send(rental); 
});

function validateReturn(req) {
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required(),
    });
    return schema.validate(genre);
}


module.exports = router