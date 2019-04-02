const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy


const {
  Clients
} = require('./db')


passport.use(new LocalStrategy(
  (username, password, done) => {
    Clients.findOne({
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
    Clients.findByPk(userId)
      .then((user) => done(null, user))
      .catch(done)
  }
)

module.exports = passport
