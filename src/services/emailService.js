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
        html: getBodyHTMlEmail(dataSend)
    })
}

let getBodyHTMlEmail = (dataSend) => {
    let result = ''
    if (dataSend.language === 'vi') {
        result = `
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
        <div>Xin chân thành cảm ơn!</div>
        `
    }
    if (dataSend.language === 'en') {
        result = `
        <h3>Dear ${dataSend.patientName}</h3>
        <p>You received this email because you booked an appointment online on Do Quoc Huy </p>
        <p>Medical appointment information: </p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Doctor: ${dataSend.doctorName}</b></div>

        <p>If the above information is correct, please click on the link below to confirm and complete the appointment procedure.
        </p>
         <div>
            <a href=${dataSend.redirectLink} target="_blank">Click here</a>
        </div>
        <div>Thank you very much!</div>
        `
    }
    return result
}

module.exports = {
    simpleSendEmail
}