const User = require("../../models/profile/User");
const cloudinary = require("../../configs/cloundinary.config");
const deleteImageController = async (rep, res) => {
  const { id_user, typeImage } = rep.body;
  try {
    const user = await User.findById(id_user);
    if (typeImage === "avatar") {
      await User.findByIdAndUpdate(
        { _id: id_user },
        { $set: { avatar: null } },
        { upsert: true }
      ).then(async () => {
        const response = await cloudinary.uploader.destroy(
          user.avatar.public_id,
          {
            resource_type: "image",
          }
        );
        console.log(response);
      });
    } else if (typeImage === "cover") {
      await User.findByIdAndUpdate(
        { _id: id_user },
        { $set: { cover: null } },
        { upsert: true }
      ).then(async () => {
        const response = await cloudinary.uploader.destroy(
          user.cover?.public_id,
          {
            resource_type: "image",
          }
        );
        console.log(response);
      });
    }
    res.status(200).json({
      image: null,
      text: "Xóa ảnh thành công",
    });
  } catch (error) {
    res.status(400).json({
      text: "Xóa ảnh thất bại",
    });
  }
};

module.exports = {
  deleteImageController,
};
