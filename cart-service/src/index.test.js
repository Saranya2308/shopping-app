const request = require('supertest');
const app = require('./index');

describe('Cart Service', () => {
  it('GET / should return 200 and the correct message', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Cart Service is running!');
  });
});
