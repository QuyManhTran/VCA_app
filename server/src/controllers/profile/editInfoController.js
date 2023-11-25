const User = require('../../models/profile/User');

const editInfoController = async (req, res) => {
    const {id_user, username, phoneNumber, birthday} = req.body;
    
    try {
        await User.findOne({ _id: id_user });        
    } catch (error) {
        return res.status(404).json({
            text: "Không tìm thấy tài khoản"
        })
    }

    try {
        await User.findOneAndUpdate(
            { _id: id_user },
            { $set: { 
                username: username,
                phoneNumber: phoneNumber,
                birthday: birthday,
             } },
            { upsert: true },
        );

        return res.status(200).json({ text: 'Thay đổi thông tin thành công ' });
    } catch {
        return res.status(400).json({ text: 'Thay đổi thông tin thất bại' });
    }
}

module.exports = {
    editInfoController
}