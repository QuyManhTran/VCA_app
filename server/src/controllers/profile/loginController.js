const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/profile/User');

const loginController = async (req, res) => {
   
    const {email, password} = req.query;
    
    
    // Tìm người dùng trong cơ sở dữ liệu
    const user = await User.findOne({ email });

    if (!user) {
        return res.json({ message: 401 });
    }

    // So sánh mật khẩu đã mã hóa
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.json({ message: 402 });
    }

    // Tạo mã JWT để xác thực
    const token = jwt.sign({ username: user.username, email: user.email }, 'my-secret-key');

    res.json({user: {...user._doc}, message: 200});
}

module.exports = {
    loginController
}