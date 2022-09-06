const mongoose = require('mongoose');
const Joi = require('joi');


const Customer = mongoose.model('Customer', new mongoose.Schema({
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
}));

function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        phone: Joi.string().min(9).pattern(/^[0-9]+$/).required(),
        isGold: Joi.boolean()
    });
    return schema.validate(customer);
}

// SINGLE RESPONSIBILITY

module.exports.Customer = Customer;
exports.validate = validateCustomer;