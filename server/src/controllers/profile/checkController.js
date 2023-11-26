const User = require("../../models/profile/User");
const Food = require('../../models/food/food');

const isLikeCtrl = async (req, res) => {
    const {food_id, user_id} = req.query;

    const food = await Food.findOne({_id: food_id});
    const user = await User.findOne({_id: user_id});

    if (!food) {
        return res.status(200).json({ message: 'Món ăn không tồn tại' });
    }

    if (!user) {
        return res.status(200).json({ message: 'Tên người dùng không tồn tại' });
    }

    const like_list = user.like_list;
    for (let i = 0; i < like_list.length; i++) {
        if (food_id == like_list[i].items) {
            return res.status(200).json("Đã like");
        }
	}
    return res.status(200).json("Chưa like");
}


const isRateCtrl = async (req, res) => {
    const {food_id, user_id} = req.query;

    const food = await Food.findOne({_id: food_id});
    const user = await User.findOne({_id: user_id});

    if (!food) {
        return res.status(200).json({ message: 'Món ăn không tồn tại' });
    }

    if (!user) {
        return res.status(200).json({ message: 'Tên người dùng không tồn tại' });
    }

    for (let i = 0; i < food.rate_list.length; i++) {
		if (food.rate_list[i].user_id === user_id) {
			return res.status(200).json("Đã rate");
		}
	}
    return res.status(200).json("Chưa rate");
}

module.exports = {
    isLikeCtrl, isRateCtrl
};
