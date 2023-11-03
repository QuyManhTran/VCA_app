import * as request from "../utilies/request";
interface registerProps {
  email: string;
  password: string;
}
export const login = async (path: string, payload: registerProps) => {
  try {
    const response = await request.get(path, payload);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const loginPath = "/account/login";
