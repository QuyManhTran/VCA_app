const ulist = require('../../models/ulist/ulist');
const Food = require('../../models/food/food');
const food = require('../../models/food/food');

const createNewList = async (req, res, next) => {
    const { name, id_user } = req.body;
    // originalString = req.file.path;
    // const startIndex = originalString.indexOf("public");
    // const image = originalString.substring(startIndex);
    // console.log(image);
    const allListOfUser = await ulist.find({ id_user: id_user })
    const nameListOfUser = allListOfUser.map((list, index) => {
        return list.name;
    });

    if (nameListOfUser.includes(name)) {
        return res.status(422).json({
            success: false,
            text: "name already exist or id_user incorrect"
        })
    }

    const newUList = new ulist({ id_user: id_user, name: name });
    try {
        await newUList.save()
            .then(ulist => {
                res.status(200).json({
                    id: ulist._id,
                    name: ulist.name,
                    success: true,
                    text: "Create new list successfull"
                })
            })
    } catch (error) {

        res.status(500).json({
            success: false,
            text: "Fail create new lish"
        })

    }

};

const getAllList = async (req, res, next) => {
    const { id_user } = req.query;
    try {
        let allList = await ulist.find({ id_user: id_user }).sort({ createAt: -1 });
        const newAllList = allList.map((list, index) => {
            return { id: list._id, name: list.name }
        })
        res.status(200).json(newAllList);
        allList = null;

    } catch (error) {
        res.status(400).json({
            success: false,
            text: "Fail"
        })
    }
};

const getSingleList = async (req, res, next) => {
    const { id_user, id_ulist } = req.query;

    ulist.find({ _id: id_ulist, id_user: id_user })
        .then(list => {
            const promises = list[0].listFood.map(async (idFood, key) => {
                const food = await Food.findById(idFood);
                return {
                    id: idFood,
                    name: food.name,
                    like: food.like,
                    rate: food.rate,
                    tags: food.tags,
                    image: food.image,
                };
            });
            return Promise.all(promises);
        })
        .then(listFoodDetail => {
            res.status(200).json({
                foods: listFoodDetail
            });
        })
        .catch(error => {
            res.status(400).json({
                success: false,
                text: "Fail"
            });
        })

};

const deleteList = async (req, res, next) => {
    const { id_user, id_ulist } = req.body;
    // const { id } = req.params;
    try {
        const result = await ulist.deleteOne({ _id: id_ulist, id_user: id_user });
        if (result.deletedCount === 1) {
            res.status(200).json({
                success: true,
                text: "Delete Success"
            });
        } else {
            res.status(400).json({
                success: false,
                text: "Delete Failed: Item not found or permission denied"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            text: "Server Error"
        });
    }

};

const editNameList = async (req, res, next) => {
    const { newName, id_user, id_ulist } = req.body;
    try {
        let list = await ulist.findOneAndUpdate(
            { _id: id_ulist, id_user: id_user },
            { $set: { name: newName } },
            { upsert: true },
        )


        if (list) {
            // Update successful
            res.status(200).json({
                success: true,
                text: "Update name success",
            });
        } else {
            // Document not found, handle accordingly
            res.status(404).json({
                success: false,
                text: "Document not found",
            });
        }

    } catch (error) {
        console.log(error.code);
        if (error.code === 11000) {
            res.status(422).json({
                success: false,
                text: "id_user incorrect"
            })
        } else {
            res.status(400).json({
                success: false,
                text: "Fail"
            })
        }

    }
};

const addItemOfList = async (req, res, next) => {
    const { id_food, id_user, id_ulist } = req.body;
    try {

        let list = await ulist.find({ _id: id_ulist, id_user: id_user });
        const old_list_food = [...list[0].listFood]
        console.log(list[0].listFood);
        let isIdFoodExsit = false;
        for (let i = 0; i < old_list_food.length; i++) {
            if (old_list_food[i] == id_food) {
                isIdFoodExsit = true;
                break;
            }
        }
        if (isIdFoodExsit) {
            return res.status(422).json({
                success: false,
                text: "name already exist"
            })
        }
        const updateList = [...list[0].listFood, id_food];

        if (!list) {
            res.status(404).json({
                success: false,
                text: "Document not found",
            });
        }
        try {
            let list = await ulist.findOneAndUpdate(
                { _id: id_ulist, id_user: id_user },
                { $set: { listFood: updateList } },
                { upsert: true },
            );

            if (list) {
                res.status(200).json({
                    success: true,
                    text: "Update list success",
                });
            } else {
                res.status(404).json({
                    success: false,
                    text: "Document not found",
                });
            }

            list = null;
        } catch (error) {
            console.log(error);
            res.status(400).json({
                success: false,
                text: "Fail"
            })
        }


    } catch (error) {

        res.status(500).json({
            success: false,
            text: "id_user incorrect or not found id of list"
        })

    }
};

const addItemToMutilList = async (req, res, next) => {
    const { id_food, id_user, list_id_ulist } = req.body;
    try {
        const ulistDetails = await ulist.find({ _id: { $in: list_id_ulist }, id_user: id_user });

        const list_id_ulist_with_existing_name = [];
        let is_existing_name = false;
        
        for (let i = 0; i < ulistDetails.length; i++) {
            const ulistDetail = ulistDetails[i];
            if (ulistDetail.listFood.includes(id_food)) {
                is_existing_name = true;
                list_id_ulist_with_existing_name.push(ulistDetail._id);
            }
        }
        
        if (is_existing_name) {
            return res.status(422).json({
                success: false,
                text: "Name already exists in the list",
                list_id_ulist_with_existing_name: list_id_ulist_with_existing_name
            });
        }

        for (let i = 0; i < ulistDetails.length; i++) {
            const ulistDetail = ulistDetails[i];
            ulistDetail.listFood.push(id_food);

            await ulist.findOneAndUpdate(
                { _id: ulistDetail._id, id_user: id_user },
                { $set: { listFood: ulistDetail.listFood } },
                { upsert: true }
            );
        }

        res.status(200).json({
            success: true
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            text: "Internal server error"
        });
    }
};


const deleteItemOfList = async (req, res, next) => {
    const { idFood, id_user, id_ulist } = req.body;

    let list = await ulist.find({ _id: id_ulist, id_user: id_user });
    updateList = [...list[0].listFood];
    updateList = updateList.filter(item => item !== idFood)

    try {
        let list = await ulist.findOneAndUpdate(
            { _id: id_ulist, id_user: id_user },
            { $set: { listFood: updateList } },
            { upsert: true },
        );

        if (list) {

            res.status(200).json({
                success: true,
                text: "delete item of list success",
            });
        } else {

            res.status(404).json({
                success: false,
                text: "Document not found",
            });
        }

        list = null;
    } catch (error) {
        res.status(400).json({
            success: false,
            text: "Fail"
        })
    }
};




module.exports = {
    createNewList,
    editNameList,
    getAllList,
    getSingleList,
    addItemOfList,
    deleteItemOfList,
    deleteList,
    addItemToMutilList
}