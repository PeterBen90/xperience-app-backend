'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

// this makes the expect syntax available throughout
// this module
const expect = chai.expect;

const { Experience } = require('../models');
const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);

//this function is used to put random documents into the db
function seedExperienceData() {
  console.info('seeding experience data');
  const seedData = [];

  for (let i=1; i<=10; i++) {
    seedData.push(generateExperienceData());
  }
  // this will return a promise
  return Experience.insertMany(seedData);
}

// used to generate data to put in db
function generateExperienceRecommendation() {
  const recommendations = [
    'light', 'not_light'];
  return recommendations[Math.floor(Math.random() * recommendations.length)];
}

// generate an object represnting an experience.
function generateExperienceData() {
  return {
    title: faker.lorem.words(),
    date: faker.lorem.words(),
    details: faker.lorem.paragraph(),
    recommendation: generateExperienceRecommendation(),
  };
}

function tearDownDb() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}

describe('Experiences API resource', function() {

  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    return seedExperienceData();
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });

  describe('GET endpoint', function() {

    it('should return all existing experiences', function() {

      let res;
      return chai.request(app)
        .get('/experience')
        .then(function(_res) {
          res = _res;
          expect(res).to.have.status(200);
          expect(res.body.recipes).to.have.length.of.at.least(1);
          return Experience.count();
        })
        .then(function(count) {
          expect(res.body.recipes).to.have.length(count);
        });
    });
  });
});
