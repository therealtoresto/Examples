const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../schema/user.js');
require('dotenv').config();
const secret = process.env.SECRET;

const auth = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (!user || err) {
            return res.status(401).json({
                status: 'error',
                code: 401,
                message: 'Unauthorized',
                data: 'Unauthorized'
            })
        }

        req.user = user;
        next();
    })(req, res, next)
}

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.validPassword(password)) {
        return res.status(400).json({
            status: 'error',
            code: 401,
            message: 'Incorrect login or password',
            data: 'Bad request'
        })
    }

    const payload = {
        id: user.id,
        username: user.username
    }

    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
    res.json({
        status: 'success',
        code: 200,
        data: {
            token
        }
    })
})

router.post('/registration', async (req, res, next) => {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        return res.status(409).json({
            status: 'error',
            code: 409,
            message: 'Email is already in use',
            data: 'Conflict'
        })
    }
    try {
        const newUser = new User({ username, email });
        newUser.setPassword(password);
        await newUser.save();

        res.status(201).json({
            status: 'success',
            code: 201,
            message: 'Registration successful',
            data: 'Success'
        });
    } catch (err) {
        next(err);
    }
})

router.get('/list', auth, (req, res, next) => {
    const { username, email } = req.user;
    res.json({
        status: 'success',
        code: 200,
        data: {
            message: `Authorisation successful: Name: ${username} Email: ${email}`,
        }
    })
});

module.exports = router;
