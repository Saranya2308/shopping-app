// src/test.js
const request = require('supertest');
const expect = require('chai').expect;
const app = require('./index');  // Correct path

describe('Product Service', () => {
  it('should return a 200 status on GET /', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
