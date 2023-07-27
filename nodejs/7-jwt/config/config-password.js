const passport = require('passport');
const passportJWT = require('passport-jwt');
const User = require('../schema/user.js');
require('dotenv').config();

const secret = process.env.SECRET;

const ExtractJWT = passportJWT.ExtractJwt;
const Stratagy = passportJWT.Strategy;
const params = {
    secretOrKey: secret,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
}

// Jwt strategy
passport.use(
    new Stratagy(params, function (payload, done) {
        User.find({ _id: payload.id })
            .then(([user]) => {
                if (!user) {
                    return done(new Error('User not found'));
                }

                return done(null, user);
            })
            .catch((err) => done(err))
    }),
)
