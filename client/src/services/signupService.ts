import * as request from "../utilies/request";
interface registerProps {
  username: string;
  email: string;
  password: string;
}
export const register = async (path: string, payload: registerProps) => {
  try {
    const response = await request.post(path, payload);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const pathRegister = "/account/signup";
