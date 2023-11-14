const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/profile/User");

const loginController = async (req, res) => {
  const { email, password } = req.query;

  // Tìm người dùng trong cơ sở dữ liệu
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Tên người dùng không tồn tại" });
  }

  if (!user) {
    return res.json({ message: 401 });
  }

  // So sánh mật khẩu đã mã hóa
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(402).json({ message: "Mật khẩu không đúng" });
  }

  res.json({ user: { ...user._doc }, message: "Đăng nhập thành công" });
};

module.exports = {
  loginController,
};
