const nodemailer = require('nodemailer');
const { generateEmailContent } = require('./emailTemplate.js');
require('dotenv').config();

const { USER, PASS, HOST, PORT } = process.env;
const sendMail = async () => {
    try {
        const transport = nodemailer.createTransport({
            host: HOST,
            port: PORT,
            auth: {
                user: USER,
                pass: PASS
            }
        });

        const content = generateEmailContent();

        const options = {
            from: '',
            to: '',
            subject: 'Weekends',
            html: content
        }

        const result = await transport.sendMail(options);
        console.log('Email sended!');
        return result;
    } catch(err) {
        console.error('Error with sending email:', err);
    }
}


module.exports = {
    sendMail
}