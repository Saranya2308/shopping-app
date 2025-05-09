// src/app.js
const express = require('express');
const app = express();

app.use(express.json());

app.post('/pay', (req, res) => {
  const { amount, cardNumber } = req.body;
  if (!amount || !cardNumber) {
    return res.status(400).json({ error: 'Missing data' });
  }
  res.status(200).json({ success: true });
});

module.exports = app;
