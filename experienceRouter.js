'use strict';

const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

mongoose.Promise = global.Promise;
const jsonParser = bodyParser.json();
const router = express.Router();

const jwtAuth = passport.authenticate('jwt', {session: false})
const { User } = require('./users/models')

router.use(jwtAuth);
router.use(bodyParser.json());

// Get user experiences
router.get('/:userId', (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      res.json(user.experiences)
    })
})

router.post('/:userId', (req, res) => {
  const experience = {
    title: req.body.title,
    date: req.body.date,
    location: req.body.location,
    details: req.body.details,
    recommendation: req.body.recommendation,
  }

  User.findById(req.params.userId)
    .then(user => {
      user.experiences.push(experience)

      user.save(err => {
        if (err) {
          res.send(err)
        }
        res.json(user.experiences)
      })
    })
})

router.delete('/:userId', (req, res) => {

  User.findById(req.params.userId)
    .then(user => {

      user.experiences.id(req.body.experienceId).remove()

      user.save(err => {
        if (err) {
          res.send(err)
        }
        res.json(user.experiences)
      })
    })
})

router.put('/:userId', (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      const experience = user.experiences.id(req.body.experience.experienceId)
      experience.title = req.body.experience.title
      experience.date = req.body.experience.date
      experience.location = req.body.experience.location
      experience.details = req.body.experience.details
      experience.recommendation = req.body.experience.recommendation

      user.save(err => {
        if (err) {
          res.send(err)
        }
        res.json(user.experiences)
      })
    })
})

module.exports = { router }