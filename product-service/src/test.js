const request = require('supertest');
const app = require('./index'); // Import the app

describe('Product Service', () => {
    it('should return a list of products', async () => {
        const response = await request(app).get('/products');
        
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({ id: 1, name: 'Laptop', price: 1000 }),
            expect.objectContaining({ id: 2, name: 'Smartphone', price: 500 }),
            expect.objectContaining({ id: 3, name: 'Headphones', price: 100 })
        ]));
    });

    it('should return a single product by id', async () => {
        const response = await request(app).get('/products/1');
        
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ id: 1, name: 'Laptop', price: 1000 });
    });

    it('should return a 404 error for non-existing product', async () => {
        const response = await request(app).get('/products/999');
        
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Product not found');
    });
});
