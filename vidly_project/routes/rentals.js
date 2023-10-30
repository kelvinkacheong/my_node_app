const express = require('express');
const router = express.Router();
const { Rental, validateRental } = require('../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');

router.get('/', async (req, res) => {
  const rentals = await Rental.find().sort({ dateOut: -1 });
  res.send(rentals);
});

router.post('/', async (req, res) => {
  const { error } = validateRental(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(404).send("invalid customer ID.");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(404).send("invalid movie ID.");

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    },
  });

  rental = await rental.save();

  movie.numberInStock--;
  movie.save();

  res.send(rental);
});

router.put('/:id', async (req, res) => {
  const { error } = validateMovie(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const movie = await Movie.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });

  if (!movie) return res.status(404).send('The Movie with the given ID was not found.');
  
  res.send(movie);
});

router.delete('/:id', async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);

  if (!movie) return res.status(404).send('The Movie with the given ID was not found.');

  res.send(movie);
});

router.get('/:id', async (req, res) => {
  const movie = await Movie.findById(req.params.id);
  
  if (!movie) return res.status(404).send('The Movie with the given ID was not found.');

  res.send(movie);
});

module.exports = router;