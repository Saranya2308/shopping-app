const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Dummy route for processing payment
app.post('/pay', (req, res) => {
    const { amount, paymentMethod } = req.body;
    if (!amount || !paymentMethod) {
        return res.status(400).json({ error: 'Amount and payment method are required' });
    }
    
    // Simulate payment processing logic here
    res.status(200).json({ message: 'Payment processed successfully', amount, paymentMethod });
});

app.listen(port, () => {
    console.log(`Payment Service listening at http://localhost:${port}`);
});

module.exports = app; // For testing
