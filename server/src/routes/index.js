var express = require('express');
const accountRouter = require('./profile/account.route');
const ulistRouter = require('./ulist/ulist.route');
var router = express.Router();


const route = (app) => {
  app.use('/account', accountRouter)
  app.use('/ulist', ulistRouter);
  app.use('/food', foodRouter)
}

module.exports = route;
