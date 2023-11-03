import * as request from "../utilies/request";
// send email
const sendEmail = async (path: string, payload: { email: string }) => {
  try {
    const response = await request.post(path, payload);
    return response;
  } catch (error) {
    console.log(error);
  }
};
const sendEmailPath = "/account/forgot";
// confirm OTP
const sendOTP = async (
  path: string,
  payload: { email: string; otp: string }
) => {
  try {
    const response = await request.post(path, payload);
    return response;
  } catch (error) {
    console.log(error);
  }
};
const sendOTPPath = "/account/confirm";

// reset password
const resetPassword = async (
  path: string,
  payload: { email: string; password: string }
) => {
  try {
    const response = await request.post(path, payload);
    return response;
  } catch (error) {
    console.log(error);
  }
};
const resetPath = "/account/change-password";
export const sendEmailService = { sendEmail, sendEmailPath };
export const sendOTPService = { sendOTP, sendOTPPath };
export const resetService = { resetPassword, resetPath };
