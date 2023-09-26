const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            minlength: 6,
            maxlength: 40,
        },
        email: {
            type: String,
            required: true,
            minlength: 6,
            maxlength: 50,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            maxlength: 2048
        },
        isAdmin: {
            type: Boolean,
            default: false
        }

    }, { timestamps: true }
);

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;