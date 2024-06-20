const asyncHandler = require('express-async-handler');
const nodemailer = require('nodemailer');

const sendEmail = asyncHandler(async (req, res) => {
    const {name,email,phone,company_name,message}=req.body;
    const emailContent = `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Company Name: ${company_name}
        Message: ${message}
    `;
    const to="info@unitrestech.com";
    const subject="Website Form Submitted"
    const text=emailContent;

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to,
        subject,
        text,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        res.status(200).send('Email sent successfully');
    }
    catch (error) {
        console.log('Error sending email:', error);
        res.status(500).send('Error sending email');
    }
});

module.exports = { sendEmail };
