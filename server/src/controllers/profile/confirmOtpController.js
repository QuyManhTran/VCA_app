const User = require('../../models/profile/User');

const comfirnOtpController = async (req, res) => {
   
    const { email, otp} = req.body;

    const user = await User.findOne({ email });
    if(otp === user.otp) {
        return res.status(200).json({ message: 'Xác nhận mã OTP thành công!' });
    }else {
        return res.status(401).json({ message: 'Mã xác nhận không đúng. Vui lòng xem lại!' });
    }
};

module.exports = {
    comfirnOtpController,
}