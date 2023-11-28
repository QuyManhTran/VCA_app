const Food = require("../../models/food/food");

const popularShow = async (req, res) => {
  const limit = 5;
  try {
    const foods = await Food.find({ like: { $gt: 0 } })
      .sort({ like: -1 })
      .limit(limit);
    const result = foods.map((foodInstance) => {
      return {
        id: foodInstance._id,
        name: foodInstance.name,
        image: foodInstance.image,
        tags: foodInstance.tags,
        like: foodInstance.like,
        rate: foodInstance.rate,
      };
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ text: "Lỗi server!" });
  }
};

const loveShow = async (req, res) => {
  const limit = 5;
  try {
    const foods = await Food.find({ rate: { $gt: 1 } })
      .sort({ rate: -1 })
      .limit(limit);
    const result = foods.map((foodInstance) => {
      return {
        id: foodInstance._id,
        name: foodInstance.name,
        image: foodInstance.image,
        tags: foodInstance.tags,
        like: foodInstance.like,
        rate: foodInstance.rate,
      };
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ text: "Lỗi server!" });
  }
};

const newShow = async (req, res) => {
  const limit = 5;
  try {
    const foods = await Food.find().sort({ updatedAt: -1 }).limit(limit);
    const result = foods.map((foodInstance) => {
      return {
        id: foodInstance._id,
        name: foodInstance.name,
        image: foodInstance.image,
        tags: foodInstance.tags,
        like: foodInstance.like,
        rate: foodInstance.rate,
      };
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ text: "Lỗi server!" });
  }
};

module.exports = {
  popularShow,
  loveShow,
  newShow,
};
