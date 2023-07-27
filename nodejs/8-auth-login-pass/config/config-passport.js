const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../schemas/user')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => done(null, user))
  .catch((err) => done(err))
})

passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          return done(null, false)
        }
        if (!user.validPassword(password)) {
          return done(null, false)
        }
        return done(null, user)
      })
      .catch((err) => done(err))
  }),
)
