const User = require('../../models/profile/User')

const deleteAccount = async (req, res) => {
    const {username} = req.body;
    if (username) {
        console.log('Tài khoản đã bị xóa:', username);
    } else {
        console.log('Không tìm thấy tài khoản để xóa.');
    }
};

module.exports = {
    deleteAccount
}