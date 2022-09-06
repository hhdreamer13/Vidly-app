const Joi = require('joi');
const mongoose = require('mongoose');

  
  const Rental = mongoose.model('Rental', new mongoose.Schema({
    customer: {
      type: new mongoose.Schema({
        name: {
          type: String,
          required: true,
          maxlength: 50
      },
      phone: {
          type: String,
          required: true,
          // match: /07*./,
          minlength: 5,
          maxlength: 15
      },
      isGold: {
          type: Boolean,
          default: false
      }
      }),
      required: true
    },
    movie: {
      type: new mongoose.Schema({
        title: {
          type: String,
          required: true,
          // trime: true,
          maxlength: 50
      },
      dailyRentalRate: {
          type: Number,
          require: true,
          min: 0,
          max: 255
      }
      }),
      required: true
    },
    dateOut: {
      type: Date,
      required: true,
      default: Date.now
    },
    dateReturned: {
      type: Date
    },
    rentalFee: {
      type: Number,
      min: 0
    }
  }));

// Joi new documentation
function validateRental(rental) {
    const schema = Joi.object({
        customerId: Joi.string().required(),
        movieId: Joi.string().required()
    });
    return schema.validate(rental);
}

// Mongo Schema

module.exports.Rental = Rental;
exports.validate = validateRental;