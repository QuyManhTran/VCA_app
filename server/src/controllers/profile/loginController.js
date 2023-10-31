const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/profile/User')

const loginController = async (req, res) => {
    const { username, password } = req.body;
    
    // Tìm người dùng trong cơ sở dữ liệu
    const user = await User.findOne({ username });

    if (!user) {
        return res.status(401).json({ message: 'Tên người dùng không tồn tại' });
    }

    // So sánh mật khẩu đã mã hóa
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Mật khẩu không đúng' });
    }

    // Tạo mã JWT để xác thực
    const token = jwt.sign({ username: user.username }, 'my-secret-key', { expiresIn: '1h' });

    res.json({ message: 'Đăng nhập thành công', token });
}

module.exports = {
    loginController
}