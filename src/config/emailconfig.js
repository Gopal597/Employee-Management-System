const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.EMAIL_USER, // Admin email ID
    pass: process.env.EMAIL_PASS, // Admin Gmail Password
  },
});
module.exports = transporter;
