const express = require("express");
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

const { foodController } = require("../../controllers/food/foodController");
const {
  foodSearchAllCtrl,
  foodSearchTagCtrl,
} = require("../../controllers/food/searchFoodCtrl");
const {
  popularShow,
  loveShow,
  newShow,
} = require("../../controllers/food/foodShowCtrl");
const {
  likeReact,
  rateReact,
} = require("../../controllers/food/foodReactCtrl");
const { searchByImage } = require("../../controllers/food/searchByImage");

foodRouter.get("/infor", foodController);
foodRouter.get("/search/tag", foodSearchTagCtrl);
foodRouter.get("/search/all", foodSearchAllCtrl);
foodRouter.post("/search-image", searchByImage);

foodRouter.get("/show/popular", popularShow);
foodRouter.get("/show/love", loveShow);
foodRouter.get("/show/new", newShow);

foodRouter.post("/react/like", likeReact);
foodRouter.post("/react/rate", rateReact);

module.exports = foodRouter;
