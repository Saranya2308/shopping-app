const request = require('supertest');
const app = require('./index');  // No .js extension needed in CommonJS

describe('POST /pay', () => {
  it('should process payment successfully', (done) => {
    request(app)
      .post('/pay')
      .send({ amount: 100, paymentMethod: 'card' })
      .expect(200)
      .expect(res => {
        if (!res.body.message.includes('Payment processed')) throw new Error('Payment not processed');
      })
      .end(done);
  });

  it('should return 400 if data is missing', (done) => {
    request(app)
      .post('/pay')
      .send({})
      .expect(400)
      .end(done);
  });
});
