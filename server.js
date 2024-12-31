const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000; // Default port, change as needed

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Or another email service
  auth: {
    user: 'ermanfaminiano020@gmail.com', // Replace with your email
    pass: 'vgyd abld larl twua', // Replace with your email password
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
    from: 'your-email@gmail.com', // Sender address
    to: 'ermanfaminiano020@gmail.com', // Replace with the recipient's email
    subject: 'New Chat Message', // Subject line
    text: `You received a new message: ${message}`, // Email body
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
