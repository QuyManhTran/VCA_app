var express = require("express");
const accountRouter = require("./profile/account.route");
const ulistRouter = require("./ulist/ulist.route");
const foodRouter = require("./food/food.route");
const commentRouter = require("./comment/comment.route");

const route = (app) => {
  app.use("/account", accountRouter);
  app.use("/ulist", ulistRouter);
  app.use("/food", foodRouter);
  app.use("/blog", commentRouter);
};

module.exports = route;
