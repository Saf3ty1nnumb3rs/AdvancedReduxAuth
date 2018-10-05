const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Create Local Strategy
const localOptions = { usernameField: 'email' }
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
    // Verify username and password, call done if correct
    User.findOne({ email: email}, (err, user) => {
        // Error
        if(err) { return done(err);}

        // No error but user not found
        if(!user) {return done(null, false);}

        // compare passwords
        user.comparePassword(password, (err, isMatch) => {
            if(err) { return done(err)}
            if(!isMatch) { return done(null, false); }

            return done(null, user);
        })
    })


})

// Setup options for JWT strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    // See if the user id in the payload exists in our database
    // If it does, call 'done' with that object
    // Else, call done without a user object
    User.findById(payload.sub, (err, user) => {
        if(err) { return done(err, false) }

        if(user) {
            done(null, user);
        } else {
            done(null, false);
        }
    })
})

// Tell passport to use this strategy
passport.use(jwtLogin)
passport.use(localLogin)