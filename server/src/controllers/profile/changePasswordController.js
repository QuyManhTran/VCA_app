const User = require('../../models/profile/User');
const bcrypt = require('bcryptjs');

const changePasswordController = async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;

    if (email === '' || email === null) {
        return res.status(404).json({
            text: "Email không tồn tại"
        })
    }

    console.log(req.body);

    try {
        const user = await User.findOne({ email: email });

        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                text: "Mật khẩu cũ không đúng"
            })
        }
    } catch (error) {
        return res.status(404).json({
            text: "Email không tồn tại"
        })
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    try {
        await User.findOneAndUpdate(
            { email: email },
            { $set: { password: hashedPassword } },
            { upsert: true },
        );

        return res.status(200).json({ text: 'Đổi mật khẩu thành công' });
    } catch {
        return res.status(400).json({ text: 'Có lỗi, vui lòng thử lại' });
    }

};

module.exports = {
    changePasswordController,
}