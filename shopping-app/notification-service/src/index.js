const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 3004; // Different port for notification-service

// Setup email transporter using Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'  // Use environment variables for credentials in a real app
  }
});

// Function to send email
const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: to,
    subject: subject,
    text: text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

app.get('/', (req, res) => {
  res.send('Notification Service is running!');
});

app.get('/send-notification', (req, res) => {
  const { email, message } = req.query;
  if (email && message) {
    sendEmail(email, 'Shopping App Notification', message);
    res.send(`Notification sent to ${email}`);
  } else {
    res.send('Please provide email and message');
  }
});

app.listen(port, () => {
  console.log(`Notification Service listening at http://localhost:${port}`);
});
