const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

//Define our model
const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        minlength: 9,
        trim: true 
    },
    password: {
        type:String,
        minlength: 7
    }
})
//Encrypt the saved password
userSchema.pre('save', function(next){
    const user = this;

    bcrypt.genSalt(10, function(err, salt){
        if(err) { return next(err) }

        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if(err) { return next(err); }

            user.password = hash;
            next();
        })
    })
})
//Create the model class
const User = mongoose.model('user',userSchema)

//Export the model
module.exports = User;