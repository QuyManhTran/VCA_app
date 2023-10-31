const bcrypt = require('bcryptjs');
const User = require('../../models/profile/User')
// const jwt = require('jsonwebtoken');

const signUpController = async (req, res) => {
  const { username, email, password } = req.body;

  // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });

  newUser.save()
    .then(() => {
      res.json({ message: 'Đăng ký thành công' });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Lỗi đăng ký', error });
    });
}

module.exports = {
  signUpController
}