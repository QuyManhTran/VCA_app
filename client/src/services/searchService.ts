import * as request from "../utilies/request";
// search follow by tag
const searchTag = async (path: string, payload: { tag: string }) => {
  const response = await request.get(path, payload);
  return response;
};
const searchTagPath = "/search/tag";
// search follow by Keyword
const searchAll = async (path: string, payload: { keyword: string }) => {
  const response = await request.post(path, payload);
  return response;
};
const searchAllPath = "/search/all";
export const searchTagService = { searchTag, searchTagPath };
export const searchAllService = { searchAll, searchAllPath };