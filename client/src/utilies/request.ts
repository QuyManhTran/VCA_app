import axios from "axios";
const baseURL = process.env.EXPO_PUBLIC_API_URL;
const request = axios.create({
  baseURL: baseURL,
});
export const get = async (path: string, options = {}) => {
  try {
    const response = await request.get(path, { params: options });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const post = async (path: string, options = {}) => {
  try {
    const response = await request.post(path, options);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export default request;
