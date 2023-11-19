const { onComment } = require("../../controllers/comment/CommentController");
const express = require("express");
const commentRouter = express.Router();

commentRouter.get("/comment", onComment);
module.exports = commentRouter;
