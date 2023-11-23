const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/profile/User");

const loginController = async (req, res) => {
  const { email, password } = req.query;

    if (!user) {
        return res.status(200).json({ message: 'Tên người dùng không tồn tại' });
    }

    if (!isPasswordValid) {
        return res.status(200).json({ message: 'Mật khẩu không đúng' });
    }

    res.status(200).json({user: {...user._doc}, message: 'Đăng nhập thành công'});
}

module.exports = {
  loginController,
};
