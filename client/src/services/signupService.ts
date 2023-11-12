import * as request from "../utilies/request";
interface registerProps {
  username: string;
  email: string;
  password: string;
}
export const register = async (path: string, payload: registerProps) => {
  const response = await request.post(path, payload);
  return response;
};
export const pathRegister = "/account/signup";
