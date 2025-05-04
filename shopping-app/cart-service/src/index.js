const express = require('express');
const app = express();
const port = 3001; // Different port for cart-service

app.get('/', (req, res) => {
  res.send('Cart Service is running!');
});

app.listen(port, () => {
  console.log(`Cart Service listening at http://localhost:${port}`);
});
