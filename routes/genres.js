// const asyncMiddleware = require('../middleware/async');
const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin')
const {Genre, validate} = require('../models/genre')
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');



//
router.get('/', async (req, res) => {
        const genres = await Genre.find().sort('name');
        res.send(genres);
});
// router.get('/', async (req, res, next) => {
//     try {
//         const genres = await Genre.find().sort('name');
//         res.send(genres);
//     }
//     catch (ex) {
//         next(ex);
//     }
// });

router.get('/:id', validateObjectId, async (req, res) => {
    const genre = await Genre.findById(req.params.id);

    if(!genre) return res.status(404).send('Your genre not found');

    res.send(genre);
});

router.post('/',auth, async (req, res) => {

    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();

    res.send(genre);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message);
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    })
    // If the genre does not exist
    if (!genre) return res.status(400).send('This genre does not exist!');

    // Return genre
    res.send(genre)
});

router.delete('/:id', [auth, admin], async (req, res) => {
    
    const genre =  await Genre.findByIdAndRemove(req.params.id);
    // If the genre does not exist
    if (!genre) return res.status(400).send('This genre does not exist!');
    // Delete
    res.send(genre);
});


module.exports = router;