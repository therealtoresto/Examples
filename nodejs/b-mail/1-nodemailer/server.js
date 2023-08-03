const express = require('express');
const { sendMail } = require('./emailController.js');
const app = express();

app.get('/send-email', async (req, res) => {
    try {
        const result = await sendMail();
        res.send(result);
    } catch(err) {
        res.status(500).send('Error with email sending');
    }
});

app.listen(3000, () => {
    console.log('Server started on 3000 port');
});