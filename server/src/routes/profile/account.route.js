const express = require("express");
const accountRouter = express.Router();
const {
  signUpController,
  singupGoogleController,
} = require("../../controllers/profile/signUpController");
const {
  loginController,
} = require("../../controllers/profile/loginController");
const {
  sendMailController,
} = require("../../controllers/profile/sendMailController");
const {
  ggLoginController,
  ggCallbackController,
  ggInfor,
} = require("../../controllers/profile/ggLoginController");
const { deleteAccount } = require("../../controllers/profile/deleteAccount");
const {
  confirmOtpController,
} = require("../../controllers/profile/confirmOtpController");
const {
  changePasswordController,
} = require("../../controllers/profile/changePasswordController");
const {
  addImageController,
} = require("../../controllers/profile/addImageController");
const {
  deleteImageController,
} = require("../../controllers/profile/deleteImageController");
const {
  editInfoController,
} = require("../../controllers/profile/editInfoController");
const {
  isLikeCtrl,
  isRateCtrl,
} = require("../../controllers/profile/checkController");
accountRouter.get("/login", loginController);
accountRouter.post("/signup", signUpController);
accountRouter.post("/forgot", sendMailController);
accountRouter.post("/confirm", confirmOtpController);
accountRouter.patch("/change-password", changePasswordController);
accountRouter.put("/delete", deleteAccount);
accountRouter.patch("/add-image", addImageController);
accountRouter.patch("/delete-image", deleteImageController);
accountRouter.patch("/edit-infor", editInfoController);
accountRouter.get("/check/like", isLikeCtrl);
accountRouter.get("/check/rate", isRateCtrl);
// Đăng nhập bằng tài khoản Google
accountRouter.get("/auth/google", ggLoginController);

// Xử lý callback sau khi đăng nhập thành công
accountRouter.get("/auth/google/callback", ggCallbackController);

// Trang hiển thị thông tin người dùng sau khi đăng nhập
accountRouter.get("/profile", ggInfor);

accountRouter.post("/google-signup", singupGoogleController);

module.exports = accountRouter;
