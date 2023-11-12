const cloudinary = require('../../configs/cloundinary.config');
const Food = require('../../models/food/food');
const {foodSearchByName, foodSearchByTags, foodSearchByConditions} = require('./seachFoodUltis');

const foodSearchByNameCtrl = async (req, res) => {
    const {name} = req.query;
    // Tìm món ăn trong cơ sở dữ liệu

    const food = await foodSearchByName(name);

    if (!food) {
        return res.status(401).json({ message: 'Không tìm được món ăn phù hợp' });
    }

    return res.status(200).json(food);
}

const foodSearchByTagsCtrl = async (req, res) => {
    //tags: Tết, Truyền thống
    const {tags} = req.query;
    const tagsArray = tags.split(",");
    // Tìm món ăn trong cơ sở dữ liệu

    const food = await foodSearchByTags(tagsArray);
    console.log(tagsArray);
    if (!food) {
        return res.status(401).json({ message: 'Không tìm được món ăn phù hợp' });
    }

    return res.status(200).json(food);
}

const foodSearchByConditionsCtrl = async (req, res) => {
    //properties =name,like
    //name,like =Phở bò,0
    //Chú ý các string bắt buộc không có dấu space
    
    const {properties, name,like} = req.query;
    const propertiesArray = properties.split(",");
    const valuesArray = values.split(",");
    // Tìm món ăn trong cơ sở dữ liệu

    const food = await foodSearchByConditions(propertiesArray, valuesArray);
    if (!food) {
        return res.status(401).json({ message: 'Không tìm được món ăn phù hợp' });
    }
    console.log(propertiesArray + "\n" + valuesArray);
    return res.status(200).json(food);
}
module.exports = {
    foodSearchByNameCtrl, foodSearchByTagsCtrl, foodSearchByConditionsCtrl
}