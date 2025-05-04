const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Product Service is running!');
});

app.listen(port, () => {
  console.log(`Product Service listening at http://localhost:${port}`);
});
