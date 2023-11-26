const express = require('express');
const accountRouter = express.Router();
const { signUpController } = require('../../controllers/profile/signUpController');
const { loginController } = require('../../controllers/profile/loginController');
const { sendMailController } = require('../../controllers/profile/sendMailController');
const {ggLoginController, ggCallbackController, ggInfor} = require('../../controllers/profile/ggLoginController')
const {deleteAccount} = require('../../controllers/profile/deleteAccount');
const {confirmOtpController } = require('../../controllers/profile/confirmOtpController');
const { changePasswordController } = require('../../controllers/profile/changePasswordController');
const {isLikeCtrl, isRateCtrl} = require('../../controllers/profile/checkController');

accountRouter.get('/login', loginController);
accountRouter.post('/signup', signUpController);
accountRouter.post('/forgot', sendMailController);
accountRouter.post('/confirm', confirmOtpController);
accountRouter.post('/change-password', changePasswordController);
accountRouter.put('/delete', deleteAccount);

accountRouter.get('/check/like', isLikeCtrl);
accountRouter.get('/check/rate', isRateCtrl);

// Đăng nhập bằng tài khoản Google
accountRouter.get('/auth/google', ggLoginController);

// Xử lý callback sau khi đăng nhập thành công
accountRouter.get('/auth/google/callback', ggCallbackController);

// Trang hiển thị thông tin người dùng sau khi đăng nhập
accountRouter.get('/profile', ggInfor);




module.exports = accountRouter;