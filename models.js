'use strict';

const mongoose = require('mongoose');

// Schema to represent a new experience post
const ExperienceSchema = mongoose.Schema({
  id: {type: String},
  title: {type: String, required: true},
  date: {type: String, required: true},
  details: {type: String, required: true},
  recommendation: {type: String, required: true},
});

const Experience = mongoose.model('Experience', ExperienceSchema);

module.exports = { Expense, ExperienceSchema }