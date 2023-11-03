const nodemailer = require('nodemailer');
const User = require('../../models/profile/User');

const genrateOTP = () => {
  var otp = Math.floor(100000 + Math.random() * 900000); // Tạo số ngẫu nhiên từ 100000 đến 999999
  return otp.toString(); // Chuyển số thành chuỗi
}
const sendMailController = async (req, res) => {
  const { email } = req.body;
  console.log(email);

  const user = await User.findOne({ email });


  if (user === null) {
    res.json({ message: 401 });
  } else {
    const otp = genrateOTP();

    // Tạo một phiên gửi email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: '21020779@vnu.edu.vn',
        pass: 'eglv bxko aqbh eyws',
      },
    });

    // Cấu hình email
    const mailOptions = {
      from: '21020779@vnu.edu.vn', // Địa chỉ email người gửi
      to: email, // Địa chỉ email người nhận
      subject: 'Mã OTP của quý khách',
      html: otp
    };

    // Gửi email
    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.error('Lỗi khi gửi email: ', error);
        res.json({ message: 500 });
      } else {
        console.log('Email đã được gửi: ', info.response);
        await User.findOneAndUpdate(
          { email: email },
          { $set: { otp: otp } },
          { upsert: true },
        );
        res.json({ message: 200 });
      }
    });
  }


}

module.exports = {
  sendMailController
}