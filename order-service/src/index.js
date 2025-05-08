const express = require('express');
const app = express();
app.use(express.json());

app.post('/create-order', (req, res) => {
  const { userId, items, totalAmount } = req.body;

  if (!userId || !Array.isArray(items) || typeof totalAmount !== 'number') {
    return res.status(400).json({ success: false, message: 'Invalid order data' });
  }

  // Simulated order creation logic
  const orderId = Math.floor(Math.random() * 100000);
  res.status(201).json({
    success: true,
    orderId,
    message: 'Order created successfully'
  });
});

const PORT = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`Order service running on port ${PORT}`));
}

module.exports = app;
