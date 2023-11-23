const cloudinary = require('../../configs/cloundinary.config');
const Food = require('../../models/food/food');

const foodSearchAllCtrl = async (req, res) => {
    const {keyword} = req.query;

    // Tìm món ăn trong cơ sở dữ liệu
    const foodByTag = await Food.find({
        tags: { $regex: new RegExp(keyword, "i")}
    });
    const foodByName = await Food.find({
        name: { $regex: new RegExp(keyword, "i")}
    });
    const food = foodByTag.concat(foodByName);
    console.log(foodByName)
    if (food.length === 0) return res.status(401).json({ message: 'Không tìm được món ăn phù hợp' });

    const result = food.map(foodInstance => {
        return {
            id: foodInstance._id,
            name: foodInstance.name,
            image: foodInstance.image,
            tags: foodInstance.tag,
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

    if (!food) {
        return res.status(401).json({ message: 'Không tìm được món ăn phù hợp' });
    }

    const result = food.map(foodInstance => {
        return {
            id: foodInstance._id,
            name: foodInstance.name,
            image: foodInstance.image,
            tags: foodInstance.tag,
            like: foodInstance.like,
            rate: foodInstance.rate
        };
    });
    console.log(result);
    return res.status(200).json(result);
}

module.exports = {
    foodSearchAllCtrl, foodSearchTagCtrl
}