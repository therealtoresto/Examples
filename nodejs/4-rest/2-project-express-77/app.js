const express = require('express');
const {
    getUserList,
    createUser,
    updateUser,
    deleteUser
} = require('./controllers/userController.js');
const morgan = require('morgan');
const fs = require('node:fs');
const path = require('node:path');
const { logger } = require('./logger.js');
require('dotenv').config();

const app = express();
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

app.set('view engine', 'ejs');
app.use(express.json());
// app.use(morgan('combined', { stream: accessLogStream }));
// app.use(morgan('dev'));

app.post('/users', createUser);

app.get('/users', logger, getUserList);

app.put('/users/:id', updateUser);

app.delete('/users/:id', deleteUser);

app.listen(process.env.PORT, () => {
    console.log(`Express server is listen port: ${process.env.PORT}`);
});
