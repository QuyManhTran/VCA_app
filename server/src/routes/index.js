var express = require('express');
const accountRouter = require('./profile/account.route');
const ulistRouter = require('./ulist/ulist.route');
const foodRouter = require('./food/food.route');


const route = (app) => {
  app.use('/account', accountRouter)
  app.use('/ulist', ulistRouter);
  app.use('/food', foodRouter)
}

module.exports = route;
