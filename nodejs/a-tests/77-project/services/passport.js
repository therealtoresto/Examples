const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../schemas/user');

passport.serializeUser((user, done) => {
  done(null, user.id)
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => done(null, user))
  .catch((err) => done(err))
});

passport.use(
  new LocalStrategy({ usernameField: 'username' }, async (username, password, done) => {
    try {
      const user = await User.findOne({ username })
      if (!user) {
        return done(null, false)
      }
      const result = await user.validPassword(password);
      if (!result) {
        return done(null, false)
      }
      return done(null, user)
    } catch(err) {
        return done(null, false);
    }
  }),
);
