const express = require('express');
const ulist = require('../../controllers/ulist/ulist');
const ulistRouter = express.Router();

const multer = require('multer');

const storage = multer.diskStorage({
    destination: './src/public/images',
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
})

const upload = multer({
    storage: storage
});

ulistRouter.post('/create-new-list', ulist.createNewList);
ulistRouter.get('/all-list', ulist.getAllList);
ulistRouter.get('/single-list', ulist.getSingleList);
ulistRouter.delete('/delete-list', ulist.deleteList);
ulistRouter.patch('/edit-name-list', ulist.editNameList);
ulistRouter.patch('/add-item-list', ulist.addItemOfList);
ulistRouter.delete('/delete-item-list', ulist.deleteItemOfList);

module.exports = ulistRouter;