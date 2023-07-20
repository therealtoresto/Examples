const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routerApi = require('./api/api.js');
require('dotenv').config();

mongoose.connect(process.env.DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();

app.use(express.json());
app.use(cors());

require('./config/config-password.js');

app.use('/api', routerApi);

app.use((req, res, next) => {
    res.status(404).json({
        status: 'error',
        code: 404,
        message: `Use api on routes:
        /api/registration - registration user { username, email, password }
        /api/login - login { email, password }
        /api/list - get message if user is authenticated`,
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

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started at ${port}`);
});
