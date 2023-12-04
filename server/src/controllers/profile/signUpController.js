const bcrypt = require("bcryptjs");
const User = require("../../models/profile/User");
const ulistModel = require("../../models/ulist/ulist");
const ulistController = require("../../controllers/ulist/ulist");
const history = require("../../models/ulist/history");
const cloudinary = require("../../configs/cloundinary.config");
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

const singupGoogleController = async (req, res) => {
  const { email, password, avatar, username } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const response = await cloudinary.uploader.upload(avatar, {
      folder: "VCA/avatars",
      resource_type: "image",
    });
    if (response?.public_id) {
      console.log(response);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        avatar: { url: response.secure_url, public_id: response.public_id },
      });
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
              .json({
                user: { ...user._doc },
                message: "Đăng nhập thành công",
              });
          } catch (error) {
            console.log(error);
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.code == 11000) {
            return res.status(409).json({
              message: "Email already exist",
            });
          }
          return res.status(401).json({ message: error });
        });
    } else {
      return res.status(500).json({
        text: "Có lỗi hệ thống!",
      });
    }
  } catch (error) {}
};

module.exports = {
  signUpController,
  singupGoogleController,
};
