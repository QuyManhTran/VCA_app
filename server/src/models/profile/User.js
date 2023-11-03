const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserAccount = new Schema ({
    username: {
        type: String,
        // required: true,
        
        // trim: true,
      },
      email: {
        type: String,
        // required: true,
        unique: true,
      },
      otp: {
        type: String,
      },
      password: {
        type: String,
        // required: true,
      },
})

module.exports = mongoose.model('account', UserAccount)