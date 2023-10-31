var express = require('express');
const accountRouter = require('./profile/account.route');
var router = express.Router();


const route = (app) => {
  app.use('/account', accountRouter)
}

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = route;
