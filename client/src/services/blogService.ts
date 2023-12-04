interface LikeReactProps {
  food_id: string;
  user_id: string;
}
interface RateReactProps {
  food_id: string;
  user_id: string;
  rateUser: number;
}

interface ReactCheckingProps {
  food_id: string;
  user_id: string;
}

interface RecommendProps {
  limit?: number;
  page?: number;
}
import * as request from "../utilies/request";
/**
 * [GET] get blog
 * @param path
 * @param payload
 * @returns
 */
const getBlog = async (path: string, payload: { _id: string }) => {
  const response = await request.get(path, payload);
  return response;
};
const blogPath = "/food/infor";
/**
 * [POST] send like react to server
 * @param path
 * @param body
 * @returns
 */
const likeReact = async (path: string, body: LikeReactProps) => {
  const response = await request.post(path, body);
  return response;
};
const likeReactPath = "food/react/like";
/**
 * [POST] send rate react to server
 * @param path
 * @param body
 * @returns
 */
const rateReact = async (path: string, body: RateReactProps) => {
  const response = await request.post(path, body);
  return response;
};
const rateReactPath = "food/react/rate";
/**
 * [GET] isLiked food
 * @param path
 * @param params
 * @returns
 */
const checkLike = async (path: string, params: ReactCheckingProps) => {
  const response = await request.get(path, params);
  return response;
};
const checkLikePath = "/account/check/like";
/**
 * [GET] isRated food
 * @param path
 * @param params
 * @returns
 */
const checkRate = async (path: string, params: ReactCheckingProps) => {
  const response = await request.get(path, params);
  return response;
};
const checkRatePath = "/account/check/rate";
/**
 * [GET] get reccomned for user
 * @param path
 * @param params
 * @returns
 */
const getRecommend = async (path, params: RecommendProps) => {
  const response = await request.get(path, params);
  return response;
};
const getReccomendPath = "/ulist/recommend";
/**
 * [EXPORT]
 */
export const blogService = { getBlog, blogPath };
export const likeReactService = { likeReact, likeReactPath };
export const rateReactService = { rateReact, rateReactPath };
export const checkLikeService = { checkLike, checkLikePath };
export const checkRateService = { checkRate, checkRatePath };
export const recommendService = { getRecommend, getReccomendPath };
