const cloudinary = require('../../configs/cloundinary.config');
const Food = require('../../models/food/food');

const foodSearchAllCtrl = async (req, res) => {
    const {searchString} = req.query;

    // Tìm món ăn trong cơ sở dữ liệu
    const foodByTag = await Food.find({
        tag: { $regex: new RegExp(searchString, "i")}
    });
    const foodByName = await Food.find({
        name: { $regex: new RegExp(searchString, "i")}
    });
    const food = foodByTag.concat(foodByName);

    if (food.length === 0) return res.status(401).json({ message: 'Không tìm được món ăn phù hợp' });

    return res.status(200).json(food);
}

const foodSearchTagCtrl = async (req, res) => {
    const {tag} = req.query;

    // Tìm món ăn trong cơ sở dữ liệu
    const food = await Food.find({
        tag: { $regex: new RegExp(tag, "i")}
    });

    if (!food) {
        return res.status(401).json({ message: 'Không tìm được món ăn phù hợp' });
    }

    return res.status(200).json(food);
}

module.exports = {
    foodSearchAllCtrl, foodSearchTagCtrl
}