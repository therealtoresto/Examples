const fs = require('node:fs');
const path = require('node:path');
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const userRouter = require('./routes/user.js');
const taskRouter = require('./routes/task.js');
const {
    auth,
    login,
    logout,
    renderLoginPage, 
    renderProfile 
} = require('./controllers/auth.js');

const app = express();
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

dotenv.config();
const { PORT, DB_NAME, MONGO_URL } = process.env;

app.set('view engine', 'ejs');
app.use(express.json());
app.use(morgan('combined', { stream: accessLogStream }));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/users', userRouter);
app.use('/tasks', taskRouter);

app.get('/', (req, res) => {
    res.render('index')
});

app.get('/login', renderLoginPage);
app.post('/login', login);
app.post('/logout', logout);

app.get('/profile', auth, renderProfile);

const connection = mongoose.connect(MONGO_URL);

connection.then(() => {
    console.log(`Connected to ${MONGO_URL}`);
    app.listen(process.env.PORT, () => {
        console.log(`Express server is listen port: ${process.env.PORT}`);
    });
}).catch((err) => console.log(err));

