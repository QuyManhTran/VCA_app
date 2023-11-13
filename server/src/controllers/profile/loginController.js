const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/profile/User");

const loginController = async (req, res) => {
   
    const {email, password} = req.query;
    
    // Tìm người dùng trong cơ sở dữ liệu
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json({ message: 'Tên người dùng không tồn tại' });
    }

  if (!user) {
    return res.json({ message: 401 });
  }

    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Mật khẩu không đúng' });
    }

  if (!isPasswordValid) {
    return res.json({ message: 402 });
  }

    res.json({user: {...user._doc}, message: 'Đăng nhập thành công'});
}

module.exports = {
  loginController,
};
