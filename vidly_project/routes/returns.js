const Joi = require('joi');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { Rental } = require('../models/rental');
const { Movie } = require('../models/movie');

router.post('/', [auth, validate(validateReturn)], async(req, res) => {
  const rental = await Rental.lookup(req.body.customerId, req.body.movieId);
  
  if (!rental) return res.status(404).send('The rental with the given ID was not found.');

  if (rental.dateReturned) return res.status(400).send('This return is already processed');

  rental.return();
  await rental.save();

  await Movie.updateOne({ _id: rental.movie._id }, {
    $inc: { numberInStock: 1 }
  });

  res.send(rental);
});

function validateReturn(req) {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
  };

  return Joi.validate(req, schema);
}

module.exports = router;