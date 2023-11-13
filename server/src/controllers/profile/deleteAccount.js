const User = require('../../models/profile/User')

const deleteAccount = async (req, res) => {
    const {username} = req.body;
    if (username) {
        return res.status(200).json({ message: 'Tài khoản đã bị xoá:', username });
    } else {
        return res.status(401).json({ message: 'Không tìm thấy tài khoản để xóa.' });
    }
};

module.exports = {
    deleteAccount
}