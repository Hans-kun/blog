const mongoose = require('mongoose');


let Userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    
    username: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        require: true,
        unique: true
    },

    password: {
        type: String,
        require: true,
    },

    profile_picture: {
        default: "default-user.jpg",
        type: String,
        required: true,
    },
},
{timestamps: true }

);

const User = mongoose.model('user', Userschema);
module.exports = User