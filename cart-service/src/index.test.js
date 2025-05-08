const request = require('supertest');
const app = require('./index'); // Use relative path

describe('Cart Service', () => {
  it('GET / should return status 200 and correct message', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Cart Service is running!');
  });
});
