const passport = require('passport');
const passportJWT = require('passport-jwt');
const User = require('../schemas/user.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const makeJWT = ({ _id, username, role}) => {
    return jwt.sign({ _id, username, role}, process.env.SECRET, { expiresIn: '1h' });
};

const checkJWT = async (token) => {
    try {
        const decoded = jwt.decode(token, process.env.SECRET);
        const { _id } = decoded;
        const user = await User.findById(_id).populate('tasks');
        return user;
    } catch (err) {
        console.log(err);
        return;
    }
};

module.exports = {
    makeJWT,
    checkJWT
}
