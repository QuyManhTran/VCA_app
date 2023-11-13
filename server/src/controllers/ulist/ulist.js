const ulist = require('../../models/ulist/ulist');

const createNewList = async (req, res, next) => {
    const { name } = req.body;
    const image = req.file.path;
    const newUList = new ulist({ name: name, image: image });
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
                message: "name already exist"
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
    try {
        let allList = await ulist.find().sort({ createAt: -1 });
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
    const { id } = req.params;
    try {
        let list = await ulist.findById(id);
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
    const { id } = req.params;
    try {
        await ulist.deleteOne({ _id: id });
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
    const { name } = req.body;
    const { id } = req.params;
    try {
        let list = await ulist.findOneAndUpdate(
            { _id: id },
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
        if (error.code === 11000) {
            res.status(422).json({
                success: false,
                message: "name already exist"
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
    const { idFood, imageFood } = req.body;
    let list = await ulist.findById(id);
    const updateList = [...list.list, {
        id_food: idFood,
        image: imageFood
    }]


    try {
        let list = await ulist.findOneAndUpdate(
            { _id: id },
            { $set: {list : updateList}},
            { upsert: true },
        );

        if (list) {
            // Update successful
            res.status(200).json({
                success: true,
                message: "Update list success",
            });
        } else {
            // Document not found, handle accordingly
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

const deleteItemOfList = async (req, res, next) => {
    const { id } = req.params;
    const { idFood } = req.body
    let list = await ulist.findById(id);
    updateList = [...list.list]
    console.log(updateList);
    updateList = updateList.filter(item => item.id_food !== idFood)

    try {
        let list = await ulist.findOneAndUpdate(
            { _id: id },
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