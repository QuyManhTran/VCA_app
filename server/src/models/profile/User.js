const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
    format: "email",
  },
  otp: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: Object,
    properties: {
      url: { type: String },
      public_id: { type: String },
    },
  },
  cover: {
    type: Object,
    properties: {
      url: { type: String },
      public_id: { type: String },
    },
  },
  birthday: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  like_list: {
    type: Array,
    items: {
      type: String,
    },
  },
});
module.exports = mongoose.model("account", UserSchema);
