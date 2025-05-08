// src/index.js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Product Service is running!');
});

module.exports = app;  // Export the app to be used in tests
