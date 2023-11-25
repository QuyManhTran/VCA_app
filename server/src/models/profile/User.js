const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        format: "email"
    },
    otp: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    }, 
    like_list: {
        type: Array,
        items: {
            type: String
        }
    }
})

module.exports = mongoose.model('account', UserSchema)