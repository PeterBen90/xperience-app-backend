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

experienceSchema.methods.serialize = function() {

  return {
    id: this._id,
    title: this.title,
    date: this.date,
    details: this.details,
    recommendation: this.recommendation,
  };
}

const Experience = mongoose.model('Experience', experienceSchema);

module.exports = { Experience }