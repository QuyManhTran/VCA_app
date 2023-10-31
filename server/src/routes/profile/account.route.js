const express = require('express');
const accountRouter = express.Router();
const { signUpController } = require('../../controllers/profile/signUpController');
const { loginController } = require('../../controllers/profile/loginController');
const { sendMailController } = require('../../controllers/profile/sendMailController');
const {ggLoginController, ggCallbackController, ggInfor} = require('../../controllers/profile/ggLoginController')
const {deleteAccount} = require('../../controllers/profile/deleteAccount')

accountRouter.post('/login', loginController);
accountRouter.post('/signup', signUpController);
accountRouter.post('/send-email', sendMailController);
accountRouter.post('/delete', deleteAccount);


// Đăng nhập bằng tài khoản Google
accountRouter.get('/auth/google', ggLoginController);

// Xử lý callback sau khi đăng nhập thành công
accountRouter.get('/auth/google/callback', ggCallbackController);

// Trang hiển thị thông tin người dùng sau khi đăng nhập
accountRouter.get('/profile', ggInfor);

module.exports = accountRouter;