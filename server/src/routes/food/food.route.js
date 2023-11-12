const express = require('express');
const foodRouter = express.Router();

const { foodController } = require('../../controllers/food/foodController');
const {foodSearchByNameCtrl, foodSearchByTagsCtrl, foodSearchByConditionsCtrl} = require('../../controllers/food/searchFoodCtrl');


foodRouter.get('/infor', foodController);
foodRouter.get('/search-by-name', foodSearchByNameCtrl);
foodRouter.get('/search-by-tags', foodSearchByTagsCtrl);
foodRouter.get('/search-by-conditions', foodSearchByConditionsCtrl);

module.exports = foodRouter;