const Food = require('../../models/food/food');

// Search for multiple conditions with absolute precision
async function foodSearchByConditions(properties, values) {
    // Kiểm tra xem các thuộc tính và giá trị có cùng độ dài không
    if (properties.length !== values.length) {
      throw new Error("Số lượng thuộc tính và giá trị không khớp");
    }

    // Tạo mảng các điều kiện tìm kiếm
    const conditions = new Map();
    for (let i = 0; i < properties.length; i++) {
      conditions.set([properties[i]], values[i]);
    }

    const conditionObj = Object.fromEntries(conditions);
    console.log(conditionObj);
    const results = await Food.find(conditionObj);
    return results;
}

async function foodSearchByName(name) {
    const results = await Food.find({
        name: { $regex: new RegExp(name, "i") }
    });
    return results;
}

async function foodSearchByTags(tags) {
    const results = await Food.find({
        tag: { $in: tags }
    });
    return results;
}

module.exports = {
    foodSearchByName, foodSearchByTags, foodSearchByConditions
}