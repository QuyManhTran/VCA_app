const express = require('express');
const foodRouter = express.Router();

const { foodController } = require('../../controllers/food/foodController');
const {foodSearchAllCtrl, foodSearchTagCtrl} = require('../../controllers/food/searchFoodCtrl');


foodRouter.get('/infor', foodController);
foodRouter.get('/search/tag', foodSearchTagCtrl);
foodRouter.get('/search/all', foodSearchAllCtrl);

module.exports = foodRouter;