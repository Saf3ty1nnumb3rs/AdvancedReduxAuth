const jwt = require('jwt-simple');
const User = require("../models/user");
const config = require('../config');


tokenForUser = (user) => {
    const timestamp = new Date().getTime()
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}
exports.signin = (req, res, next) => {
    //Check auth - get user from the done callback in passport
    res.send({ token: tokenForUser(req.user)})
    //Give them a token
}

exports.signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
    if(!email || !password) {
        return res.status(422).send({ error: "You must use email and password" });
    }
  // See if user with given email exists
  User.findOne({ email: email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }

    // If a user exists with same email, return an error

    if (existingUser) {
      return res.status(422).send({ error: "Email is in use" });
    }
    // If user email doesn't exist, create and save
    const user = new User({
        email,
        password
    });

    user.save((err) => {
        if(err) { return next(err)}
    })
    //Respond to request indicating the user was created
    res.json({token: tokenForUser(user)})
  });
};
