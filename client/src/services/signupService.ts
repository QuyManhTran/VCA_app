import * as request from "../utilies/request";
interface registerProps {
  username: string;
  email: string;
  password: string;
}

interface googleRegisterProps {
  username: string;
  email: string;
  password: string;
  avatar: string;
}
export const register = async (path: string, body: registerProps) => {
  const response = await request.post(path, body);
  return response;
};
export const pathRegister = "/account/signup";

export const googleRegister = async (
  path: string,
  body: googleRegisterProps
) => {
  const response = await request.post(path, body);
  return response;
};
export const googleRegisterPath = "/account/google-signup";
