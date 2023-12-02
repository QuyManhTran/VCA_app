const express = require("express");
const multer = require("multer");

const ulist = require("../../controllers/ulist/ulist");
const ulistRouter = express.Router();
const history = require("../../controllers/ulist/historyController");

const storage = multer.diskStorage({
  destination: "./src/public/images",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
});

ulistRouter.post("/create-new-list", ulist.createNewList);
ulistRouter.get("/all-list", ulist.getAllList);
ulistRouter.get("/single-list", ulist.getSingleList);
ulistRouter.delete("/delete-list", ulist.deleteList);
ulistRouter.patch("/edit-name-list", ulist.editNameList);
ulistRouter.patch("/add-item-list", ulist.addItemOfList);
ulistRouter.delete("/delete-item-list", ulist.deleteItemOfList);
ulistRouter.patch("/add-item-multi-list", ulist.addItemToMutilList);
ulistRouter.delete("/delete-item-multi-list", ulist.deleteMultiItemList);
ulistRouter.patch("/add-item-list-fix", ulist.addItemToMutilListFix);

ulistRouter.patch("/add-history", history.addWatchedFoodToHistory);
ulistRouter.get("/get-history", history.getSortedWatchedFoods);

module.exports = ulistRouter;
