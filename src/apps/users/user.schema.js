const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255,
    },
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    address: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    // emailVerificationCode: { type: Number },
    // resetToken: String,
    // resetTokenExpiration: Date,
},
    // { collection: 'users' },
);

const User = mongoose.model('User', UserSchema);

module.exports = User