const User = require("../../models/profile/User");

const addImageController = async (req, res, next) => {
    const { id_user, typeImage, image } = req.body;
    // const image = req.file.path;

    if (!(typeImage === "avatar" || typeImage === "cover"))  {
        return res.status(401).json({
            text: "errot type. type only is avatar or cover",
        })
    }

    // const startIndex = image.indexOf("public");
    // const imageFix = image.substring(startIndex);

    try {
        if (typeImage === "avatar") {
            await User.findOneAndUpdate(
                { _id: id_user },
                { $set: { avatar: image } },
                { upsert: true },
            ). then ((user) => {
                return res.status(200).json({
                    avatar: image
                })
            })

        } else if (typeImage === "cover") {
            await User.findOneAndUpdate(
                { _id: id_user },
                { $set: { cover: image } },
                { upsert: true },
            ). then ((user) => {
                return res.status(200).json({
                    cover: image
                })
            })
        }
    } catch {
        return res.status(400).json({
            text: "add image error",
        })
    }

}

module.exports = {
    addImageController,
}

