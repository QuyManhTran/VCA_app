const bcrypt = require('bcryptjs');
const User = require('../../models/profile/User')
// const jwt = require('jsonwebtoken');

const signUpController = async (req, res) => {
  
  const { username, email, password } = req.body;

  // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ username, email, password: hashedPassword });
  console.log(newUser);

  newUser.save()
  .then(() => {
    return res.status(200).json({ message: 'Đăng kí tài khoản thành công' });
  })
  .catch((error) => {
    return res.status(401).json({ message: error });
  })

}

module.exports = {
  signUpController
}