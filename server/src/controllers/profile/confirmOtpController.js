const User = require('../../models/profile/User');

const comfirnOtpController = async (req, res) => {
   
    const { email, otp} = req.body;



    const user = await User.findOne({ email });
    if(otp === user.otp) {
        res.json({
            message: 200,
        })
    }else {
        res.json({
            message: 401,
        })
    }
};

module.exports = {
    comfirnOtpController,
}