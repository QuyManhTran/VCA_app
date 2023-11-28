const express = require('express');
const foodRouter = express.Router();

const { foodController } = require('../../controllers/food/foodController');
const {foodSearchAllCtrl, foodSearchTagCtrl} = require('../../controllers/food/searchFoodCtrl');
const {popularShow, loveShow, newShow} = require('../../controllers/food/foodShowCtrl');
const {likeReact, rateReact} = require('../../controllers/food/foodReactCtrl');

foodRouter.get('/infor', foodController);
foodRouter.get('/search/tag', foodSearchTagCtrl);
foodRouter.get('/search/all', foodSearchAllCtrl);

foodRouter.get('/show/popular', popularShow);
foodRouter.get('/show/love', loveShow);
foodRouter.get('/show/new', newShow);

foodRouter.post('/react/like', likeReact);
foodRouter.post('/react/rate', rateReact);

module.exports = foodRouter;