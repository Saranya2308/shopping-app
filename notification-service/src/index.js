const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

// Example route to send notification email
app.post('/send-notification', async (req, res) => {
  const { to, subject, message } = req.body;

  // Simulated transporter (in test/mock, you'd stub this)
  const transporter = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 587,
    auth: {
      user: 'username',
      pass: 'password'
    }
  });

  try {
    await transporter.sendMail({
      from: '"Shopping App" <noreply@shoppingapp.com>',
      to,
      subject,
      text: message
    });

    res.status(200).json({ success: true, message: 'Notification sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to send notification' });
  }
});

module.exports = app;

if (require.main === module) {
  app.listen(3004, () => {
    console.log('Notification service running on port 3004');
  });
}
