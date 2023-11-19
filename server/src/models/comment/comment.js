const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  food_id: { type: String, unique: true, required: true },
  conversation: {
    type: Array,
    items: {
      type: Object,
      properties: {
        name: {
          type: String,
        },
        avatar: {
          type: String,
        },
        content: {
          type: String,
        },
        like: {
          type: Number,
        },
        time: {
          type: String,
        },
      },
    },
  },
});

const comments = mongoose.model("comment", CommentSchema);
module.exports = { comments };
