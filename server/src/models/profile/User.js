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
        unique: true,
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
      }
})

module.exports = mongoose.model('account', UserSchema)