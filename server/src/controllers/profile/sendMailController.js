const nodemailer = require('nodemailer')
const sendMailController = async (req, res) => {
    const { to, subject, text } = req.body;
  

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
    to: to, // Địa chỉ email người nhận
    subject: subject,
    text: text // Nội dung email dạng text
};
  
    // Gửi email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Lỗi khi gửi email: ', error);
        res.status(500).send('Lỗi khi gửi email');
      } else {
        console.log('Email đã được gửi: ', info.response);
        res.send('Email đã được gửi thành công');
      }
    });
}

module.exports = {
    sendMailController
}