const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/', auth, async(req, res) => {
  if (!req.body.customerId) return res.status(400).send('customerId is not provided');
  if (!req.body.movieId) return res.status(400).send('movieId is not provided');

  res.status(401).send('unauthorized');
});

module.exports = router;