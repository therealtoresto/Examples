const fs = require('node:fs');
const path = require('node:path');
const express = require('express');
const {
    getUserList,
    createUser,
    updateUser,
    deleteUser,
    renderHomepage
} = require('./controllers/userController.js');
const morgan = require('morgan');
const dotenv = require('dotenv');

const app = express();
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

dotenv.config();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(morgan('combined', { stream: accessLogStream }));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

app.get('/', renderHomepage);

app.post('/users', createUser);

app.get('/users', getUserList);

app.put('/users/:id', updateUser);

app.delete('/users/:id', deleteUser);

app.listen(process.env.PORT, () => {
    console.log(`Express server is listen port: ${process.env.PORT}`);
});
