import * as request from "../utilies/request";
interface AllListProps {
  id_user: string;
}

interface AddListProps {
  name: string;
  id_user: string;
}

interface DeleteListProps {
  id_ulist: string;
  id_user: string;
}

interface EditNameProps {
  id_user: string;
  newName: string;
  id_ulist: string;
}

interface SingleListProps {
  id_user: string;
  id_ulist: string;
}

interface AddItemListProps {
  id_user: string;
  list_id_ulist: string[];
  id_food: string;
}

interface DeleteItemListProps {
  id_user: string;
  id_ulist: string;
  id_foods: string[];
}

// [GET] All personal list
const getAllList = async (path: string, payload: AllListProps) => {
  const response = await request.get(path, payload);
  return response;
};
const allListPath = "/ulist/all-list";

// [POST] new personal list
const addList = async (path: string, payload: AddListProps) => {
  const response = await request.post(path, payload);
  return response;
};
const addListPath = "/ulist/create-new-list";

// [DELETE] delete personal list
const deleteList = async (path: string, payload: DeleteListProps) => {
  const response = await request.Delete(path, payload);
  return response;
};
const deleteListPath = "/ulist/delete-list";

// [PATCH] UPDATE name of list
const editNameList = async (path: string, body: EditNameProps) => {
  const response = await request.patch(path, body);
  return response;
};
const editNameListPath = "/ulist/edit-name-list";

// [GET] single list
const getSingleList = async (path: string, params: SingleListProps) => {
  const response = await request.get(path, params);
  return response;
};
const singleListPath = "/ulist/single-list";

// [PATCH] add item list
const addItemList = async (path: string, body: AddItemListProps) => {
  const response = await request.patch(path, body);
  return response;
};
const addItemListPath = "/ulist/add-item-list-fix";

// [DELETE] add item list
const deleteItemList = async (path: string, body: DeleteItemListProps) => {
  const response = await request.Delete(path, body);
  return response;
};
const deleteItemListPath = "/ulist/delete-item-multi-list";

export const allListService = { getAllList, allListPath };
export const addListService = { addList, addListPath };
export const deleteListService = { deleteList, deleteListPath };
export const editNameListService = { editNameList, editNameListPath };
export const singleListService = { getSingleList, singleListPath };
export const addItemListService = { addItemList, addItemListPath };
export const deleteItemListService = { deleteItemList, deleteItemListPath };
