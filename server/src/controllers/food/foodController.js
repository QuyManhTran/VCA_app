const cloudinary = require('../../configs/cloundinary.config');
const Food = require('../../models/food/food');

const foodController = async (req, res) => {
   
    const {_id} = req.query;
    // Tìm món ăn trong cơ sở dữ liệu
    const food = await Food.findOne({_id});

    if (!food) {
        return res.status(200).json({ message: 'Không tìm được món ăn' });
    }

    return res.status(200).json(food);
}

module.exports = {
    foodController
}