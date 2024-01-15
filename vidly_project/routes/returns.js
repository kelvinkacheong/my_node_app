const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Rental } = require('../models/rental'); 

router.post('/', async(req, res) => {
  if (!req.body.customerId) return res.status(400).send('customerId is not provided');

  if (!req.body.movieId) return res.status(400).send('movieId is not provided');

  const rental = await Rental.findOne({ 
    'customer._id': req.body.customerId, 
    'movie._id': req.body.movieId 
  });
  if (!rental) return res.status(404).send('The rental with the given ID was not found.');

  res.status(401).send('unauthorized');
});

module.exports = router;