const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    food_id: { type: String, unique: true, required: true },
    conversation: {
      type: Array,
      items: {
        type: Object,
        properties: {
          userId: {
            type: String,
          },
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
            type: Object,
            properties: {
              year: { type: Number },
              month: { type: Number },
              day: { type: Number },
              hour: { type: Number },
              minute: { type: Number },
            },
          },
        },
      },
    },
  },
  { timestamps: true }
);

const comments = mongoose.model("comment", CommentSchema);
module.exports = { comments };
