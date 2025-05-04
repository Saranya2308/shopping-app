const express = require('express');
const app = express();
const port = 3002; // Different port for order-service

app.get('/', (req, res) => {
  res.send('Order Service is running!');
});

app.listen(port, () => {
  console.log(`Order Service listening at http://localhost:${port}`);
});
