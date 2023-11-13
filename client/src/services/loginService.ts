import * as request from "../utilies/request";
interface registerProps {
  email: string;
  password: string;
}
export const login = async (path: string, payload: registerProps) => {
  const response = await request.get(path, payload);
  return response;
};
export const loginPath = "/account/login";
