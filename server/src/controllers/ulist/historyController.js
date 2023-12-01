const food = require("../../models/food/food");
const history = require("../../models/ulist/history");

const getSortedWatchedFoods = async (req, res) => {
  const { id_user } = req.query;
  try {
    const userHistory = await history.findOne(
      { id_user: id_user },
      { watchedFoods: 1 }
    );
    const dataWatchedFoods = await Promise.all(
      userHistory.watchedFoods.map(async (watchedFood) => {
        const detailWatchedFood = await food.findOne({
          _id: watchedFood.food.id_food,
        });
        return {
          id: detailWatchedFood._id,
          name: detailWatchedFood.name,
          like: detailWatchedFood.like,
          rate: detailWatchedFood.rate,
          image: detailWatchedFood.image,
          tags: detailWatchedFood.tags,
          watchedAt: watchedFood.watchedAt.toISOString(),
        };
      })
    );

    dataWatchedFoods.sort(
      (a, b) => Date.parse(b.watchedAt) - Date.parse(a.watchedAt)
    );
    res.status(200).json({ dataWatchedFoods: dataWatchedFoods });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ text: "Không tìm thấy tài khoản" });
  }
};

const addWatchedFoodToHistory = async (req, res) => {
  try {
    const { id_user, id_food } = req.body;
    const currentHistory = await history.findOne({ id_user: id_user });
    if (currentHistory === null) {
      history.create({
        id_user: id_user,
        watchedFoods: [
          {
            food: {
              id_food: id_food,
            },
          },
        ],
      });
    } else {
      const userHistory = await history.findOne({
        id_user: id_user,
        "watchedFoods.food.id_food": id_food,
      });

      if (userHistory) {
        await history.updateOne(
          { id_user: id_user },
          { $pull: { watchedFoods: { "food.id_food": id_food } } }
        );

        await history.updateOne(
          { id_user: id_user },
          {
            $push: {
              watchedFoods: {
                food: {
                  id_food: id_food,
                },
              },
            },
          }
        );

        return res.status(200).json({
          text: "Cập nhật lịch sử thành công",
        });
      } else {
        await history.updateOne(
          { id_user: id_user },
          {
            $push: {
              watchedFoods: {
                food: {
                  id_food: id_food,
                },
              },
            },
          }
        );

        return res.status(200).json({
          text: "Thêm vào lịch sử thành công",
        });
      }
    }
  } catch (error) {
    return res.status(404).json({
      text: "Không tìm thấy tài khoản",
    });
  }
};

module.exports = {
  getSortedWatchedFoods,
  addWatchedFoodToHistory,
};
