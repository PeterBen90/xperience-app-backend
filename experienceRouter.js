'use strict';

const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const jsonParser = bodyParser.json();
const router = express.Router();

const { Experience } = require('./models');

// GET all experiences

router.get('/', (req, res) => {
  Experience
    .find()
    .then(experiences => {
      res.json({
        recipes: experiences.map(
          (experience) => experience.serialize())
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

module.exports = router;