const express = require('express');
const app = express();
const port = 3003; // Different port for payment-service

app.get('/', (req, res) => {
  res.send('Payment Service is running!');
});

app.listen(port, () => {
  console.log(`Payment Service listening at http://localhost:${port}`);
});
