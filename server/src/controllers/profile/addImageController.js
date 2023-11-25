const User = require("../../models/profile/User");
const cloudinary = require("../../configs/cloundinary.config");
const addImageController = async (req, res, next) => {
  const { id_user, typeImage, image } = req.body;
  // const image = req.file.path;

  if (!(typeImage === "avatar" || typeImage === "cover")) {
    return res.status(401).json({
      text: "Lỗi kiểu, chỉ nhận avatar hoặc cover",
    });
  }

  // const startIndex = image.indexOf("public");
  // const imageFix = image.substring(startIndex);

  try {
    const user = await User.findById(id_user);
    if (typeImage === "avatar") {
      const response = await cloudinary.uploader.upload(image, {
        folder: "VCA/avatars",
        resource_type: "image",
      });
      if (response?.public_id) {
        await User.findOneAndUpdate(
          { _id: id_user },
          {
            $set: {
              avatar: {
                url: response.secure_url,
                public_id: response.public_id,
              },
            },
          },
          { upsert: true }
        ).then(async () => {
          if (user.avatar !== null) {
            const response = await cloudinary.uploader.destroy(
              user.avatar.public_id,
              {
                resource_type: "image",
              }
            );
            console.log(response);
          }
          return res.status(200).json({
            avatar: response.secure_url,
          });
        });
      } else {
        return res.status(400).json({
          text: "Thêm ảnh thất bại",
        });
      }
    } else if (typeImage === "cover") {
      const response = await cloudinary.uploader.upload(image, {
        folder: "VCA/covers",
        resource_type: "image",
      });
      if (response?.public_id) {
        await User.findOneAndUpdate(
          { _id: id_user },
          {
            $set: {
              cover: {
                url: response.secure_url,
                public_id: response.public_id,
              },
            },
          },
          { upsert: true }
        ).then(async () => {
          if (user.cover !== null) {
            const response = await cloudinary.uploader.destroy(
              user.cover.public_id,
              {
                resource_type: "image",
              }
            );
            console.log(response);
          }
          return res.status(200).json({
            cover: response.secure_url,
          });
        });
      } else {
        return res.status(400).json({
          text: "Thêm ảnh thất bại",
        });
      }
    }
  } catch {
    return res.status(400).json({
      text: "Thêm ảnh thất bại",
    });
  }
};

module.exports = {
  addImageController,
};
