const express = require('express');
const passport = require('passport');
const User = require('../schemas/user.js')

const router = express.Router();

const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }

    req.flash('message', 'Authorize, please');
    res.redirect('/');
};

router.get('/', (req, res, next) => {
    console.log(req.url);
    res.render('index', { message: req.flash('message') });
});

router.post('/', (req, res, next) => {
    console.log(req.body);
    passport.authenticate('local', (err, user) => {
        console.log(user);
        if (err) {
            console.log(err);
            return next();
        }

        if (!user) {
            req.flash('message', 'Set valid login and password, please!');
            return res.redirect('/');
        }
        req.logIn(user, (err) => {
            if (err) {
                return next();
            }
            return res.redirect('/profile');
        })
    })(req, res, next)
});

router.get('/registration', (req, res, next) => {
    res.render('registration', { message: req.flash('message')})
})

const isUserAlreadyRegistered = async (email) => {
    const user = await User.findOne({ email });
    if (user) return true;
    return false;
}

const registrationMiddleware = async (req, res, next) => {
    console.log(req.url, req.body);
    const { username, email, password } = req.body;
    try {
        

        if (user) {
            req.flash('message', 'This email is already used!');
            res.redirect('/');
        }

        const newUser = new User({ username, email });
        newUser.setPassword(password);

        await newUser.save();
        req.flash('message', 'Your registration is successful!');
        res.redirect('/');
    } catch (err) {
        next(err);
    }
}

router.post('/registration', registrationMiddleware);

router.get('/profile', isLoggedIn, (req, res, next) => {
    console.log(req.session.passport);
    const { username, email } = req.user;

    res.render('profile', { username, email });
});

router.get('/logout', (req, res, next) => {
    req.logout(() => {
        console.log('Logged out');
    });
    res.redirect('/');
});

module.exports = {router, registrationMiddleware, isUserAlreadyRegistered};