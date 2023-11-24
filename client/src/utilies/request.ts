import axios from "axios";
const baseURL = process.env.EXPO_PUBLIC_API_URL;
const request = axios.create({
  baseURL: baseURL,
});

export const get = async (path: string, options = {}) => {
  try {
    const response = await request.get(path, { params: options });
    return { message: 200, data: response.data };
  } catch (error) {
    return { message: error?.response?.status || "Error network" };
  }
};

export const post = async (path: string, options = {}) => {
  try {
    const response = await request.post(path, options, { timeout: 5000 });
    return { message: 200, data: response.data };
  } catch (error) {
    return {
      message: error?.response?.data?.text || "Có lỗi, vui lòng thử lại",
    };
  }
};

export const patch = async (path: string, options = {}) => {
  try {
    const response = await request.patch(path, options, { timeout: 5000 });
    return { message: 200, data: response.data };
  } catch (error) {
    return {
      message: error?.response?.data?.text || "Có lỗi, vui lòng thử lại",
    };
  }
};

export const Delete = async (path: string, options = {}) => {
  try {
    const response = await request.delete(path, { data: options });
    return { message: 200, data: response.data };
  } catch (error) {
    return { message: error?.response?.status || "Error network" };
  }
};
export default request;
