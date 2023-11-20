const {
  onComment,
  onToggleLike,
} = require("../../controllers/comment/CommentController");
const express = require("express");
const commentRouter = express.Router();

commentRouter.get("/comment", onComment);
commentRouter.patch("/comment/like", onToggleLike);
module.exports = commentRouter;
