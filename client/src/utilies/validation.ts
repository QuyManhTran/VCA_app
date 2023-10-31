import {
  emailRegex,
  otpRegex,
  passwordRegex,
  spaceRegex,
} from "../../constants/regexs";

export const isSpace = (input: string): boolean => {
  return spaceRegex.test(input);
};

export const isEmail = (email: string): boolean => {
  return emailRegex.test(email) || email.length === 0;
};

export const isLoginPassword = (password: string): boolean => {
  return passwordRegex.test(password) || password.length === 0;
};

export const isOTP = (otp: string): boolean => {
  return otpRegex.test(otp);
};
