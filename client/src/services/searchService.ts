import * as request from "../utilies/request";
/**
 * [GET] search by tag
 * @param path
 * @param params
 * @returns
 */
const searchTag = async (path: string, params: { tag: string }) => {
  const response = await request.get(path, params);
  return response;
};
const searchTagPath = "food/search/tag";

/**
 * [GET] search by keyword
 * @param path
 * @param params
 * @returns
 */
const searchAll = async (path: string, params: { keyword: string }) => {
  const response = await request.get(path, params);
  return response;
};
const searchAllPath = "food/search/all";

/**
 * [GET] get popular food
 * @param path
 * @returns
 */
const getTrendingFood = async (path: string, params: { limit: number }) => {
  const response = await request.get(path, params);
  return response;
};
const getTrendingFoodPath = "food/show/";

export const searchTagService = { searchTag, searchTagPath };
export const searchAllService = { searchAll, searchAllPath };
export const trendingService = { getTrendingFood, getTrendingFoodPath };
