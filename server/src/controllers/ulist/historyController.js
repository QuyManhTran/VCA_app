const food = require("../../models/food/food");
const history = require("../../models/ulist/history");

const getSortedWatchedFoods = async (req, res) => {
    const { id_user } = req.body;
    const userHistory = await history.findOne(
        { id_user: id_user },
        { watchedFoods: 1 }
    )

    if (!userHistory) {
        return res.status(404).json({ message: "User history not found" });
    }

    const dataWatchedFoods = await Promise.all(userHistory.watchedFoods.map(async (watchedFood) => {
        const detailWatchedFood = await food.findOne({
            _id: watchedFood.food.id_food
        })
        return {
            id_food: detailWatchedFood._id,
            name: detailWatchedFood.name,
            like: detailWatchedFood.like,
            rate: detailWatchedFood.rate,
            image: detailWatchedFood.image,
            watchedAt: watchedFood.watchedAt,
        }
    }));

    dataWatchedFoods.sort((a, b) => b.watchedAt - a.watchedAt);

    res.status(200).json({ dataWatchedFoods: dataWatchedFoods });
}

const addWatchedFoodToHistory = async (req, res) => {
    try {
        const { id_user, id_food } = req.body;

        const userHistory = await history.findOne({
            id_user: id_user,
            'watchedFoods.food.id_food': id_food
        });

        if (userHistory) {

            await history.updateOne(
                { id_user: id_user },
                { $pull: { 'watchedFoods': { 'food.id_food': id_food } } }
            );

            await history.updateOne(
                { id_user: id_user },
                {
                    $push: {
                        watchedFoods: {
                            food: {
                                id_food: id_food
                            }
                        }
                    }
                }
            );

            return res.status(200).json("Cập nhật lịch sử thành công");
        } else {
            await history.updateOne(
                { id_user: id_user },
                {
                    $push: {
                        watchedFoods: {
                            food: {
                                id_food: id_food
                            }
                        }
                    }
                }
            );

            return res.status(200).json("Thêm vào lịch sử thành công");
        }
    } catch (error) {
        return res.status(404).json("Không tìm thấy tài khoản");
    }
}


module.exports = {
    getSortedWatchedFoods,
    addWatchedFoodToHistory
}