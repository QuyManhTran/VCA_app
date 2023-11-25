const cloudinary = require('../../configs/cloundinary.config');
const Food = require('../../models/food/food');

const popularShow = async (req, res) => {
    const foodArray = await Food.find();
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

    const limit = 5
    if (result.length > limit) {
        const resultLimit = result.sort((a, b) => b.like - a.like).slice(0, limit);
        return res.status(200).json(resultLimit);
    }
    return res.status(200).json(result);
}

const loveShow = async (req, res) => {
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
    
    const limit = 5
    if (result.length > limit) {
        const resultLimit = result.sort((a, b) => b.like - a.like).slice(0, limit);
        return res.status(200).json(resultLimit);
    }
    return res.status(200).json(result);
}

const newShow = async (req, res) => {
    const foodArray = await Food.find();
    const resultAr = [];
    

    for (const food of foodArray) {
        const now = new Date();
        const daysPassed = (now - food.createdAt) / (1000 * 60 * 60 * 24);
        console.log(food.createdAt);
        if (daysPassed < 2)  resultAr.push(food)
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
    
    const limit = 5
    if (result.length > limit) {
        const resultLimit = result.sort((a, b) => b.like - a.like).slice(0, limit);
        return res.status(200).json(resultLimit);
    }
    return res.status(200).json(result);
}

module.exports = {
    popularShow, loveShow, newShow
}