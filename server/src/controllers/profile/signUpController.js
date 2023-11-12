const bcrypt = require("bcryptjs");
const User = require("../../models/profile/User");
// const jwt = require('jsonwebtoken');

const signUpController = async (req, res) => {
  const { username, email, password } = req.body;

  console.log(password);

  // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });
  console.log(newUser);

  newUser
    .save()
    .then(() => {
      res.json({
        message: 200,
      });
    })
    .catch((error) => {
      res.json(error);
    });
};

module.exports = {
  signUpController,
};
