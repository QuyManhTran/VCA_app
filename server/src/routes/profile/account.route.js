const express = require('express');
const accountRouter = express.Router();
const { signUpController } = require('../../controllers/profile/signUpController');
const { loginController } = require('../../controllers/profile/loginController');
const { sendMailController } = require('../../controllers/profile/sendMailController');
const {ggLoginController, ggCallbackController, ggInfor} = require('../../controllers/profile/ggLoginController')
const {deleteAccount} = require('../../controllers/profile/deleteAccount');
const {comfirnOtpController } = require('../../controllers/profile/confirmOtpController');
const { changePasswordController } = require('../../controllers/profile/changePasswordController');

accountRouter.get('/login', loginController);
accountRouter.post('/signup', signUpController);
accountRouter.post('/forgot', sendMailController);
accountRouter.post('/confirm', comfirnOtpController);
accountRouter.post('/change-password', changePasswordController);
accountRouter.put('/delete', deleteAccount);


// Đăng nhập bằng tài khoản Google
accountRouter.get('/auth/google', ggLoginController);

// Xử lý callback sau khi đăng nhập thành công
accountRouter.get('/auth/google/callback', ggCallbackController);

// Trang hiển thị thông tin người dùng sau khi đăng nhập
accountRouter.get('/profile', ggInfor);

module.exports = accountRouter;