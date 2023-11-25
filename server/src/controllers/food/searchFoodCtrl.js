const Food = require('../../models/food/food');
const lodash = require('lodash');
const foodSearchAllCtrl = async (req, res) => {
    const {keyword} = req.query;

    // Tìm món ăn trong cơ sở dữ liệu
    const foodByTag = await Food.find({
        tags: { $regex: new RegExp(keyword, "i")}
    });
    const foodByName = await Food.find({
        name: { $regex: new RegExp(keyword, "i")}
    });
    const food = lodash.merge(foodByTag, foodByName);
      
    const result = food.map(foodInstance => {
        return {
            id: foodInstance._id,
            name: foodInstance.name,
            image: foodInstance.image,
            tags: foodInstance.tags,
            like: foodInstance.like,
            rate: foodInstance.rate
        };
    });
    
    return res.status(200).json(result);
}

const foodSearchTagCtrl = async (req, res) => {
    const {tag} = req.query;

    // Tìm món ăn trong cơ sở dữ liệu
    const food = await Food.find({
        tags: { $regex: new RegExp(tag, "i")}
    });

    const result = food.map(foodInstance => {
        return {
            id: foodInstance._id,
            name: foodInstance.name,
            image: foodInstance.image,
            tags: foodInstance.tags,
            like: foodInstance.like,
            rate: foodInstance.rate
        };
    });
    
    return res.status(200).json(result);
}

module.exports = {
    foodSearchAllCtrl, foodSearchTagCtrl
}