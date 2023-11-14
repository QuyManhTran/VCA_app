import * as request from "../utilies/request";

const getBlog = async (path: string, payload: { _id: string }) => {
  const response = await request.get(path, payload);
  return response;
};
const blogPath = "/food/infor";
export const blogService = { getBlog, blogPath };
