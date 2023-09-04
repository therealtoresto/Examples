const nodemailer = require('nodemailer');
require('dotenv').config();

const { USER, PASS, HOST, PORT } = process.env;
const transport = nodemailer.createTransport({
    host: HOST,
    port: PORT,
    auth: {
        user: USER,
        pass: PASS
    }
});

const mailOptions = {
    from: '',
    to: '',
    subject: 'Weekends',
    text: '<b>What place do you prefer?</b> Forest or swimmingpool?'
}

transport.sendMail(mailOptions, (err, info) => {
    if (err) {
        console.error('Mail sending error:', err);
    } else {
        console.log('Mail sending successful:', info);
    }
});