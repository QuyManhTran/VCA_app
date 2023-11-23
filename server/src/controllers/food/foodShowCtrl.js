const cloudinary = require('../../configs/cloundinary.config');
const Food = require('../../models/food/food');

const popularShow = async (req, res) => {
    // Tìm món ăn trong cơ sở dữ liệu
    const foodArray = await Food.find();
    console.log(foodArray);
    const resultAr = [];
    for (const food of foodArray) {
        if (food.like > 3)  resultAr.push(food)
    }
    const result = resultAr.map(foodInstance => {
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

const loveShow = async (req, res) => {
    // Tìm món ăn trong cơ sở dữ liệu
    const foodArray = await Food.find();
    const resultAr = [];
    for (const food of foodArray) {
        if (food.rate > 2.5)  resultAr.push(food)
    }
    const result = resultAr.map(foodInstance => {
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

const newShow = async (req, res) => {
    // Tìm món ăn trong cơ sở dữ liệu
    const foodArray = await Food.find();
    const resultAr = [];
    for (const food of foodArray) {
        const now = new Date();
        const daysPassed = (now - food.lastUpdate) / (1000 * 60 * 60 * 24);
        if (daysPassed < 30)  resultAr.push(food)
    }
    const result = resultAr.map(foodInstance => {
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
    popularShow, loveShow, newShow
}