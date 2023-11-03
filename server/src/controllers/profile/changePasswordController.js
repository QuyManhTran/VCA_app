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

        res.json({
            message: 200,
        });
    } catch {
        res.json({
            message: 400,
        })
    }
    

    

};

module.exports = {
    changePasswordController,
}