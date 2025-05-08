const request = require('supertest');
const app = require('../index');

describe('POST /create-order', () => {
  it('should create a new order', async () => {
    const response = await request(app)
      .post('/create-order')
      .send({
        userId: 'user123',
        items: [{ productId: 'prod001', quantity: 2 }],
        totalAmount: 150
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body).toHaveProperty('orderId');
  });

  it('should return 400 for invalid data', async () => {
    const response = await request(app)
      .post('/create-order')
      .send({
        items: 'invalid_items',
        totalAmount: 'free'
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
  });
});
