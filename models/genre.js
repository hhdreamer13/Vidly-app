const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    }
  });
  
  const Genre = mongoose.model('Genre', genreSchema);

// Joi new documentation
function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required()
    });
    return schema.validate(genre);
}

// Mongo Schema

exports.genreSchema = genreSchema;
module.exports.Genre = Genre;
exports.validate = validateGenre;