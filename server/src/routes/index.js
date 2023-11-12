var express = require('express');
const accountRouter = require('./profile/account.route');
const foodRouter = require('./food/food.route');
var router = express.Router();


var route = (app) => {
  app.use('/account', accountRouter)
  app.use('/food', foodRouter)
}


module.exports = route;
