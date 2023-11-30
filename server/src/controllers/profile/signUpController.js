const bcrypt = require("bcryptjs");
const User = require("../../models/profile/User");
const ulistModel = require("../../models/ulist/ulist");
const ulistController = require("../../controllers/ulist/ulist");
const history = require("../../models/ulist/history");

// const jwt = require('jsonwebtoken');

const signUpController = async (req, res) => {
  const { username, email, password } = req.body;
  // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });
  newUser
    .save()
    .then(async (user) => {
      console.log(user);
      try {
        const newUList = new ulistModel({
          id_user: user._id,
          name: "Xem sau",
          image: "path",
        });
        await newUList.save();
        const newHistory = new history({ id_user: user._id });
        await newHistory.save();
        return res
          .status(200)
          .json({ message: "Đăng kí tài khoản thành công" });
      } catch (error) {
        console.log(error);
      }
    })
    .catch((error) => {
      if (error.code == 11000) {
        return res.status(409).json({
          message: "Email already exist",
        });
      }
      return res.status(401).json({ message: error });
    });
};
module.exports = {
  signUpController,
};
