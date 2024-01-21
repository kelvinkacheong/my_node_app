const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Rental } = require('../models/rental');
const { Movie } = require('../models/movie');
const moment = require('moment');

router.post('/', auth, async(req, res) => {
  if (!req.body.customerId) return res.status(400).send('customerId is not provided');

  if (!req.body.movieId) return res.status(400).send('movieId is not provided');

  const rental = await Rental.findOne({ 
    'customer._id': req.body.customerId, 
    'movie._id': req.body.movieId 
  });
  if (!rental) return res.status(404).send('The rental with the given ID was not found.');

  if (rental.dateReturned) return res.status(400).send('This return is already processed');

  rental.dateReturned = new Date();
  rental.rentalFee = moment().diff(rental.dateOut, 'days') * rental.movie.dailyRentalRate;
  await rental.save();

  await Movie.updateOne({ _id: rental.movie._id }, {
    $inc: { numberInStock: 1 }
  });

  res.status(200).send('Valid request! Returned this movie.');
});

module.exports = router;