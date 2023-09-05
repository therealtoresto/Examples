const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const { ADDRESSEE, MY_EMAIL, SG_KEY } = process.env;

// Set SendGrid API key
sgMail.setApiKey(process.env.SG_KEY);

// Email config
const msg = {
  to: ADDRESSEE, // Addressee
  from: MY_EMAIL, // Your email
  subject: 'Hello from SendGrid!',
  // text: 'Hi, this is a test letter from SendGrid!', // Text variant
  html: '<p>Hi, this is a test letter from <strong>SendGrid!</strong></p>',
};

// Надсилання листа
sgMail
  .send(msg)
  .then(() => {
    console.log('Letter sended successfully!');
  })
  .catch((error) => {
    console.error(error.toString());
  });
