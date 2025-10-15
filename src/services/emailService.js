require('dotenv').config();
import nodemailer from "nodemailer"

let simpleSendEmail = async (dataSend) => {
    //create reusable transportter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD
        },
    });

    let infor = await transporter.sendMail({
        from: '"ĐỖ QUỐC HUY " <dobinhhuy69@gmail.com>',
        to: dataSend.reciverEmail,
        subject: "Thông tin đặt lệnh khám bệnh",
        html: `
        <h3>Xin chào ${dataSend.patientName}</h3>
        <p>Bạn nhận được email này vì đã đặt lệnh khám bệnh online trên Đỗ Quốc Huy </p>
        <p>Thông tin đặt lịch khám bệnh: </p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>

        <p>Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới để xác nhận và 
        hoàn tất thủ tục đặt lịch khám bệnh
        </p>
         <div>
            <a href=${dataSend.redirectLink} target="_blank">Click here</a>
        </div>
        <div>Xin chân thành cảm ơn</div>
        `,
    })
}

module.exports = {
    simpleSendEmail
}