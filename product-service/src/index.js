const express = require('express');
const app = express();
const port = 3000;

// Dummy data for products
const products = [
    { id: 1, name: 'Laptop', price: 1000 },
    { id: 2, name: 'Smartphone', price: 500 },
    { id: 3, name: 'Headphones', price: 100 }
];

// Endpoint to fetch product list
app.get('/products', (req, res) => {
    res.status(200).json(products);
});

// Endpoint to fetch a single product by ID
app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product);
});

app.listen(port, () => {
    console.log(`Product Service listening at http://localhost:${port}`);
});

module.exports = app; // For testing
