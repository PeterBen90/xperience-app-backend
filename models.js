'use strict';

const mongoose = require('mongoose');

// Schema to represent a new experience post
const experienceSchema = mongoose.Schema({
  id: {type: String},
  title: {type: String, required: true},
  date: {type: String, required: true},
  details: {type: String, required: true},
  recommendation: {type: String, required: true},
});


const Experience = mongoose.model('Experience', experienceSchema);

module.exports = { Experience, experienceSchema }