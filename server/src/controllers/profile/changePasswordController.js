const User = require('../../models/profile/User');
const bcrypt = require('bcryptjs');

const changePasswordController = async (req, res) => {
    const { email, password } = req.body;

    console.log(password);

    const user = await User.findOne({ email });

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await User.findOneAndUpdate(
            { email: email },
            { $set: { password: hashedPassword } },
            { upsert: true },
        );

        return res.status(200).json({ message: 'Đổi mật khẩu thành công' });
    } catch {
        return res.status(400).json({ message: 'Không đổi được mật khẩu. Vui lòng xem lại!' });
    }

};

module.exports = {
    changePasswordController,
}