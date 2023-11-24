import * as request from "../utilies/request";
interface EditInforProps {
  id_user: string;
  username: string;
  phoneNumber: string;
  birthday: string;
}

interface ChangePasswordProps {
  email: string;
  oldPassword: string;
  newPassword: string;
}

type ImageType = "avatar" | "cover";

interface ChangeAvatarProps {
  id_user: string;
  avatar: string;
  typeImage: ImageType;
}

interface ChangeCoverPhotoProps {
  id_user: string;
  cover: string;
  typeImage: ImageType;
}

interface DeletePhotoProps {
  id_user: string;
  typeImage: ImageType;
}
/**
 * [PATCH] edit user's information
 * @param path
 * @param body
 * @returns
 */
const editInfor = async (path: string, body: EditInforProps) => {
  const response = request.patch(path, body);
  return response;
};
const editInforPath = "/account/edit-infor";

/**
 * [PATCH] EDIT PERSONAL INFORMATION
 * @param path
 * @param body
 * @returns message
 */
const changePassword = async (path: string, body: ChangePasswordProps) => {
  const response = request.patch(path, body);
  return response;
};
const changePasswordPath = "/account/change-password";
/**
 * [POST] add or update avatar
 * @param path
 * @param body
 * @returns
 */
const changeAvatar = async (path: string, body: ChangeAvatarProps) => {
  const response = await request.post(path, body);
  return response;
};
const changeAvatarPath = "account/add-image";
/**
 * [POST] add or update cover photo
 * @param path
 * @param body
 * @returns
 */
const changeCoverPhoto = async (path: string, body: ChangeCoverPhotoProps) => {
  const response = await request.post(path, body);
  return response;
};
const changCoverPhotoPath = "account/add-image";
/**
 * [PATCH] delete avatar or cover photo
 * @param path
 * @param body
 * @returns
 */
const deletePhoto = async (path: string, body: DeletePhotoProps) => {
  const response = await request.patch(path, body);
  return response;
};
const deletePhotoPath = "account/delete-image";
export const editInforService = { editInfor, editInforPath };
export const changePasswordService = { changePassword, changePasswordPath };
export const changeAvatarService = { changeAvatar, changeAvatarPath };
export const changeCoverPhotoService = {
  changeCoverPhoto,
  changCoverPhotoPath,
};
export const deletePhotoService = { deletePhoto, deletePhotoPath };
