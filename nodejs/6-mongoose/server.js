const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const routerApi = require('./api/api.js')

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api', routerApi);

app.use((req, res, next) => {
    res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Use api on routes: /api/tasks',
        data: 'Not found'
    })
})

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({
        status: 'fail',
        code: 500,
        message: err.message,
        data: 'Internal server error'
    })
});

const PORT = 3000;
const dbURL = 'mongodb://localhost:27017/test';

const connection = mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

connection.then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Express server is started on ${PORT}`))
}).catch((err) => console.log(err.message));
