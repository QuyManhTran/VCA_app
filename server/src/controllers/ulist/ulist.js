const ulist = require('../../models/ulist/ulist');

const createNewList = async (req, res, next) => {
    const { name, id_user } = req.body;
    originalString = req.file.path;
    const startIndex = originalString.indexOf("public");
    const image = originalString.substring(startIndex);
    console.log(image);

    const newUList = new ulist({ id_user: id_user, name: name, image: image });
    try {
        await newUList.save();
        res.status(200).json({
            success: true,
            message: "Create new list successfull"
        })
    } catch (error) {
        if (error.code === 11000) {
            res.status(422).json({
                success: false,
                message: "name already exist or id_user incorrect"
            })
        } else {
            res.status(500).json({
                success: false,
                message: "Fail create new lish"
            })
        }
    }

};

const getAllList = async (req, res, next) => {
    const { id_user } = req.body;
    try {
        let allList = await ulist.find({ id_user: id_user }).sort({ createAt: -1 });
        res.status(200).json(allList);
        allList = null;

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Fail"
        })
    }
};

const getSingleList = async (req, res, next) => {
    const { id_user } = req.body;
    const { id } = req.params; //id of list
    try {
        let list = await ulist.find({ _id: id, id_user: id_user });
        res.status(200).json(list);
        list = null;

    } catch (error) {

        res.status(400).json({
            success: false,
            message: "Fail"
        })

    }
};

const deleteList = async (req, res, next) => {
    const { id_user } = req.body;
    const { id } = req.params;
    try {
        await ulist.deleteOne({ _id: id, id_user: id_user });
        res.status(200).json({
            success: true,
            message: "Delete Success"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Fail"
        })
    }
};

const editNameList = async (req, res, next) => {
    const { name, id_user } = req.body;
    const { id } = req.params;
    try {
        let list = await ulist.findOneAndUpdate(
            { _id: id, id_user: id_user },
            { $set: { name: name } },
            { upsert: true },
        )


        if (list) {
            // Update successful
            res.status(200).json({
                success: true,
                message: "Update name success",
            });
        } else {
            // Document not found, handle accordingly
            res.status(404).json({
                success: false,
                message: "Document not found",
            });
        }

    } catch (error) {
        console.log(error.code);
        if (error.code === 11000) {
            res.status(422).json({
                success: false,
                message: "id_user incorrect"
            })
        } else {
            res.status(400).json({
                success: false,
                message: "Fail"
            })
        }

    }
};

const addItemOfList = async (req, res, next) => {
    const { id } = req.params;
    const { idFood, imageFood, id_user } = req.body;
    try {

        let list = await ulist.find({ _id: id, id_user: id_user });
        const old_list_food = [...list[0].list]
        let isIdFoodExsit = false;
        for (let i = 0; i < old_list_food.length; i++) {
            if (old_list_food[i].id_food == idFood) {
                isIdFoodExsit = true;
                break;
            }
        }
        if (isIdFoodExsit) {
            return res.status(422).json({
                success: false,
                message: "name already exist"
            })
        }
        const updateList = [...list[0].list, {
            id_food: idFood,
            image: imageFood
        }];

        if (!list) {
            res.status(404).json({
                success: false,
                message: "Document not found",
            });
        }
        try {
            let list = await ulist.findOneAndUpdate(
                { _id: id, id_user: id_user },
                { $set: { list: updateList } },
                { upsert: true },
            );

            if (list) {
                res.status(200).json({
                    success: true,
                    message: "Update list success",
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: "Document not found",
                });
            }

            list = null;
        } catch (error) {
            res.status(400).json({
                success: false,
                message: "Fail"
            })
        }


    } catch (error) {

        res.status(500).json({
            success: false,
            message: "id_user incorrect or not found id of list"
        })

    }
};

const deleteItemOfList = async (req, res, next) => {
    const { id } = req.params;
    const { idFood, id_user } = req.body;

    let list = await ulist.find({_id : id, id_user:id_user});
    updateList = [...list[0].list];
    updateList = updateList.filter(item => item.id_food !== idFood)

    try {
        let list = await ulist.findOneAndUpdate(
            { _id: id, id_user:id_user },
            { $set: { list: updateList } },
            { upsert: true },
        );

        if (list) {

            res.status(200).json({
                success: true,
                message: "delete item of list success",
            });
        } else {

            res.status(404).json({
                success: false,
                message: "Document not found",
            });
        }

        list = null;
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Fail"
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
    deleteList
}