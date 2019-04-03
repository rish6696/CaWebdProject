const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy


const {
  Users
} = require('./db')


passport.use(new LocalStrategy(
  (username, password, done) => {
    Users.findOne({
      where: {
        username
      }
    }).then((user) => {
      if (!user) {
          console.log('user not found')
        return done(null, false)
      }
      if (user.password !== password) {
          console.log('wrong password')
        return done(null, false)
      }
      return done(null, user)
    }).catch(done)
  }
))


passport.serializeUser(
  (user, done) => {
    done(null, user.id)
  }
)

passport.deserializeUser(
  (userId, done) => {
    Users.findByPk(userId)
      .then((user) => done(null, user))
      .catch(done)
  }
)

module.exports = passport
