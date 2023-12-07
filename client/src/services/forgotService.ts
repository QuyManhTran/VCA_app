import * as request from "../utilies/request";
// send email
const sendEmail = async (path: string, payload: { email: string }) => {
  const response = await request.post(path, payload);
  return response;
};
const sendEmailPath = "/account/forgot";
// confirm OTP
const sendOTP = async (
  path: string,
  payload: { email: string; otp: string }
) => {
  const response = await request.post(path, payload);
  return response;
};
const sendOTPPath = "/account/confirm";

// reset password
const resetPassword = async (
  path: string,
  payload: { email: string; password: string }
) => {
  const response = await request.post(path, payload);
  return response;
};
const resetPath = "/account/reset-password";
export const sendEmailService = { sendEmail, sendEmailPath };
export const sendOTPService = { sendOTP, sendOTPPath };
export const resetService = { resetPassword, resetPath };
