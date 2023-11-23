const User = require("../../models/profile/User");

const deleteImageController = async (rep, res) => {
    const {id_user, typeImage} = rep.body;
    if (!(typeImage === "avatar" || typeImage === "cover"))  {
        return res.status(401).json({
            text: "errot type. type only is avatar or cover",
        })
    }


    try {
        if( typeImage === "avatar") {
            await User.findByIdAndUpdate(
                {_id : id_user},
                {$set: {avatar: null}},
                {upsert: true}
            )
        } else if(typeImage === "cover") {
            await User.findByIdAndUpdate(
                {_id : id_user},
                {$set: {cover: null}},
                {upsert: true}
            )
        }
        res.status(200).json({
            image: null,
            text: "delete image ok"
        })
    } catch (error) {
        res.status(400).json({
            text: "error delete image"
        })
    }
}

module.exports = {
    deleteImageController,
}