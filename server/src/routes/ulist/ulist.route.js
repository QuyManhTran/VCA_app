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

ulistRouter.post('/create-new-list', upload.single("image"), ulist.createNewList);
ulistRouter.get('/all-list', ulist.getAllList);
ulistRouter.get('/single-list/:id', ulist.getSingleList);
ulistRouter.delete('/delete-list/:id', ulist.deleteList);
ulistRouter.put('/edit-name-list/:id', ulist.editNameList);
ulistRouter.put('/add-item-list/:id', ulist.addItemOfList);
ulistRouter.put('/delete-item-list/:id', ulist.deleteItemOfList);

module.exports = ulistRouter;