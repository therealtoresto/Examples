const passport = require('passport');
const {
    createUser,
    getAllUsers
} = require('../services/user.js')

const renderProfilePage = (req, res) => {
    const user = req.user;
    res.render('profile', { user });
}

const renderLoginPage = (req, res) => {
    res.render('login');
}

const renderRegisterPage = (req, res) => {
    res.render('register');
};

const renderMainPage = (req, res) => {
    console.log('Headers:', req.headers);
    console.log('Method:', req.method);
    res.render('index');
};

const registerController = async (req, res) => {
    try {
        const { email, password, role, username } = req.body;
        const user = await createUser({ email, role, username });
        await user.setPassword(password);
        await user.save();

        res.redirect('/login');
    } catch (err) {
        console.log('Error with creating user', err);
        res.send({
            data: err
        });
    }
};


const loginController = (req, res) => {
    try {
        passport.authenticate('local', {
            successRedirect: '/profile',
            failureRedirect: '/login',
            failureFlash: false
        })(req, res);
    } catch (err) {
        console.log('error with passport', err.message);
    }
};

const logoutController = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log('Error with logout:', err.message)
        }
        res.redirect('/');
    });
}

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    };
    res.redirect('/login');
};

module.exports = {
    isLoggedIn,
    registerController,
    loginController,
    logoutController,
    renderMainPage,
    renderProfilePage,
    renderLoginPage,
    renderRegisterPage
};
