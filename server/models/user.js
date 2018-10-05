const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//Define our model
const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        minlength: 9 
    },
    password: {
        type:String,
        minlength: 7
    }
})

//Create the model class
const User = mongoose.model('user',userSchema)

//Export the model
module.exports = User;