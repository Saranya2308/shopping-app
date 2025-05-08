const request = require('supertest');
const app = require('./index'); // Import the app

describe('Payment Service', () => {
    it('should successfully process a payment with valid data', async () => {
        const response = await request(app)
            .post('/pay')
            .send({
                amount: 100,
                paymentMethod: 'Credit Card'
            });
        
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Payment processed successfully');
        expect(response.body.amount).toBe(100);
        expect(response.body.paymentMethod).toBe('Credit Card');
    });

    it('should return an error when missing amount', async () => {
        const response = await request(app)
            .post('/pay')
            .send({
                paymentMethod: 'Credit Card'
            });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Amount and payment method are required');
    });

    it('should return an error when missing payment method', async () => {
        const response = await request(app)
            .post('/pay')
            .send({
                amount: 100
            });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Amount and payment method are required');
    });
});
