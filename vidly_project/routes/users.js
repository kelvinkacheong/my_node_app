const express = require('express');
const router = express.Router();
const lodash = require('lodash');
const bcrypt = require('bcrypt');
const { User, validateUser } = require('../models/user');


router.post('/', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered.');

  user = new User(lodash.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  res.send(lodash.pick(user, ['_id', 'name', 'email']));

});

module.exports = router;