const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserAccount = new Schema ({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
})

module.exports = mongoose.model('account', UserAccount)