require('dotenv').config(); // Load .env variables

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000; // Use PORT from .env or default to 3000

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER, // Load user from .env
    pass: process.env.EMAIL_PASS, // Load password from .env
  },
});

// API route to send email
app.post('/send-email', (req, res) => {
  const { message } = req.body;

  // Validate input
  if (!message || typeof message !== 'string') {
    return res.status(400).send('Invalid message content.');
  }

  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to: process.env.EMAIL_TO,     // Recipient address from .env
    subject: 'New Chat Message',
    text: `You received a new message: ${message}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).send('Error sending email.');
    }
    console.log('Email sent:', info.response);
    res.status(200).send('Email sent successfully!');
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
