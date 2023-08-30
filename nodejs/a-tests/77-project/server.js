const fs = require('node:fs');
const path = require('node:path');
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const userRouter = require('./routes/user.js');
const taskRouter = require('./routes/task.js');
const {
    registerController,
    loginController,
    logoutController,
    renderRegisterPage,
    renderLoginPage,
    renderProfilePage,
    renderMainPage
} = require('./controllers/auth.js');
const { isLoggedIn } = require('./controllers/auth.js');
require('./services/passport.js');

const app = express();
const writeToFileStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

dotenv.config();
const { PORT, DB_NAME, MONGO_URL, SECRET } = process.env;

app.set('view engine', 'ejs');
app.use(express.json());
app.use(morgan('combined', { stream: writeToFileStream }));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    secret: SECRET,
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 20000
        // maxAge: 7200000 // 2h
    },
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/users', isLoggedIn, userRouter);
app.use('/tasks', isLoggedIn, taskRouter);

app.get('/login', renderLoginPage);
app.post('/login', loginController);
app.get('/logout', logoutController);

app.get('/register', renderRegisterPage);
app.post('/register', registerController);

app.get('/', renderMainPage);
app.get('/profile', isLoggedIn, renderProfilePage);


const connection = mongoose.connect(MONGO_URL);

connection.then(() => {
    console.log(`Connected to ${MONGO_URL}`);
    app.listen(process.env.PORT, () => {
        console.log(`Express server is listen port: ${process.env.PORT}`);
    });
}).catch((err) => console.log(err));

