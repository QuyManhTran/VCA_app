const express = require('express');
const accountRouter = express.Router();
const { signUpController } = require('../../controllers/profile/signUpController');
const { loginController } = require('../../controllers/profile/loginController');
const { sendMailController } = require('../../controllers/profile/sendMailController');
const {ggLoginController, ggCallbackController, ggInfor} = require('../../controllers/profile/ggLoginController')
const {deleteAccount} = require('../../controllers/profile/deleteAccount');
const {comfirnOtpController } = require('../../controllers/profile/confirmOtpController');
const { changePasswordController } = require('../../controllers/profile/changePasswordController');
const { addImageController } = require('../../controllers/profile/addImageController');
const {deleteImageController} = require('../../controllers/profile/deleteImageController');

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

accountRouter.get('/login', loginController);
accountRouter.post('/signup', signUpController);
accountRouter.post('/forgot', sendMailController);
accountRouter.post('/confirm', comfirnOtpController);
accountRouter.post('/change-password', changePasswordController);
accountRouter.put('/delete', deleteAccount);
accountRouter.post('/add-image', upload.single('image'), addImageController);
accountRouter.patch('/delete-image', deleteImageController)


// Đăng nhập bằng tài khoản Google
accountRouter.get('/auth/google', ggLoginController);

// Xử lý callback sau khi đăng nhập thành công
accountRouter.get('/auth/google/callback', ggCallbackController);

// Trang hiển thị thông tin người dùng sau khi đăng nhập
accountRouter.get('/profile', ggInfor);


module.exports = accountRouter;