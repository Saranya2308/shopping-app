const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('Cart Service is running!');
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Cart Service listening at http://localhost:${port}`);
  });
}

module.exports = app; // Export app for testing
