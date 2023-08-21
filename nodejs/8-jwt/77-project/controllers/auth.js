const { 
    makeJWT,
    checkJWT
 } = require('../services/passport.js');
const User = require('../schemas/user.js')

const renderProfile = (req, res) => {
    const user = req.user;
    res.render('profile', { user });
}

const renderLoginPage = (req, res) => {
    res.render('login');
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isValidPass = await user.validPassword(password);
        
        if (!user || !isValidPass) {
            return res.status(400).json({
                status: 'error',
                code: 401,
                message: 'Incorrect login or password',
                data: 'Bad request'
            })
        }
        const { _id, role } = user;
        const jwt = makeJWT({ _id, username, role });
        res.cookie('jwt', jwt, { httpOnly: true, secure: true });
        res.redirect('/profile');
    } catch (err) {
        console.log(err);
        res.json({
            status: 'Internal server error',
            code: 500,
            data: {
                err
            }
        });
    }
};

// TODO: implement black list of tokens
const logout = (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/login');
}

const auth = async (req, res, next) => {
    try {
        const { jwt } = req.cookies;
        const user = await checkJWT(jwt);
        if (!user) {
            return res.status(401).json({
                status: 'error',
                code: 401,
                message: 'Unauthorized',
                data: 'Unauthorized'
            });
        };
        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        res.redirect('/login');
    }
};

module.exports = {
    auth,
    login,
    logout,
    renderLoginPage,
    renderProfile
}
