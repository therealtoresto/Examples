const fs = require('node:fs');
const path = require('node:path');
const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRouter = require('./routes/user.js');
const taskRouter = require('./routes/task.js');

const app = express();
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

dotenv.config();
const { PORT, DB_NAME, MONGO_URL } = process.env;

app.set('view engine', 'ejs');
app.use(express.json());
app.use(morgan('combined', { stream: accessLogStream }));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use('/tasks', taskRouter);

app.get('/', (req, res) => {
    res.render('index')
})

const connection = mongoose.connect(MONGO_URL);

connection.then(() => {
    console.log(`Connected to ${MONGO_URL}`);
    app.listen(process.env.PORT, () => {
        console.log(`Express server is listen port: ${process.env.PORT}`);
    });
}).catch((err) => console.log(err));

