const express = require('express');
const foodRouter = express.Router();

const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./src/public/images",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
});

const { foodController } = require('../../controllers/food/foodController');
const {foodSearchAllCtrl, foodSearchTagCtrl} = require('../../controllers/food/searchFoodCtrl');
const { searchByImage } = require('../../controllers/food/searchByImage');


foodRouter.get('/infor', foodController);
foodRouter.get('/search/tag', foodSearchTagCtrl);
foodRouter.get('/search/all', foodSearchAllCtrl);
foodRouter.get('/search-image', upload.single('imageSearch'), searchByImage);

module.exports = foodRouter;