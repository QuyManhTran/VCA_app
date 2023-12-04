const Food = require('../../models/food/food');
const _ = require('lodash');

const getRecommend = async (req, res, next) => {
    const { limit, page } = req.query;

    let query = {};

    if (limit && page) {
        const skip = (parseInt(page) - 1) * parseInt(limit);
        query = Food.find().limit(parseInt(limit)).skip(skip);
    } else if (limit) {
        query = Food.find().limit(parseInt(limit));
    } else {
        query = Food.find();
    }

    try {
        const foods = await query.exec();
        const shuffledFoods = _.shuffle(foods)
        const result = shuffledFoods.map((foodInstance) => {
            return {
                id: foodInstance._id,
                name: foodInstance.name,
                image: foodInstance.image,
                tags: foodInstance.tags,
                like: foodInstance.like,
                rate: foodInstance.rate,
            };
        })
        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({ text: 'lỗi mạng' });
    }

}

module.exports = {
    getRecommend,
}