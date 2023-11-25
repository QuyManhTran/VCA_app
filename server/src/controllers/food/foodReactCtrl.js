const Food = require('../../models/food/food');
const User = require("../../models/profile/User");

const likeReact = async (req, res) => {
    const {food_id, user_id} = req.body;

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
            // update số like ở food
            await Food.findOneAndUpdate(
				{ _id: food_id },
				{ like: food.like - 1},
			);

            // update like_list của user
            await User.updateOne({
				_id: user_id,
			  }, {
				$pull: {
					"like_list": {
						"items": food_id
					}
				  
				}
			  });
            return res.status(200).json("Unlike thành công");
        }
        
	}
    await Food.findOneAndUpdate(
        { _id: food_id },
        { like: food.like + 1},
    );

    await User.updateOne({
		_id: user_id,
	}, {	
		$push: {
			"like_list": {
				"items": food_id
			} 
		}
	});
    return res.status(200).json("Like thành công");
}

const rateReact = async (req, res) => {

    const {food_id, user_id, rateUser} = req.body;

    const food = await Food.findOne({_id: food_id});
    const user = await User.findOne({_id: user_id});

    if (!food) {
        return res.status(200).json({ message: 'Món ăn không tồn tại' });
    }

    if (!user) {
        return res.status(200).json({ message: 'Tên người dùng không tồn tại' });
    }

    if (rateUser > 5 || rateUser <= 0) {
		return res.status(200).json({ message: 'giá trị rate không phù hợp' });
    }


    for (let i = 0; i < food.rate_list.length; i++) {
		if (food.rate_list[i].user_id === user_id) {

			const oldRateUser = food.rate_list[i].rate;
			const oldRateFood = food.rate;
			const length = food.rate_list.length;

			// update rate_list
			await Food.updateOne({
				_id: food_id,
				rate_list: {
					$elemMatch: { user_id: user_id } // Điều kiện tìm phần tử trong rate_list có user_id cụ thể
				}
			}, {	
				$set: {
					"rate_list.$.rate": rateUser
				}
			});

			const newRate = oldRateFood + (rateUser - oldRateUser) / length;
			console.log(oldRateFood + "\t" + oldRateUser + "\t" + rateUser);
			console.log(newRate);
			// update rate food
			await Food.findOneAndUpdate(
				{ _id: food_id },
				{ rate: newRate},
			);
			return res.status(200).json("update rate thành công");
		}
	}


	const oldRateFood = food.rate;
	const length = food.rate_list.length;

	await Food.updateOne({
		_id: food_id,
	}, {	
		$push: {
			"rate_list": {
				"user_id": user_id,
				"rate": rateUser,
			} 
		}
	});

	const newRate = (oldRateFood * length + rateUser) / (length + 1)
	// console.log(sum + "\t" + food.rate_list.length + "\t" + newRate);

	const updateRate = await Food.findOneAndUpdate(
		{ _id: food_id },
		{ rate: newRate},
	);

	return res.status(200).json("thêm rate thành công");
}
module.exports = {
    likeReact, rateReact
}