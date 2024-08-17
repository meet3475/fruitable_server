const nodemailer = require('nodemailer');


const sentMail = async (receiverEmail) => {
    console.log(receiverEmail);
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.NODEMAILER_AUTH_USER,
            pass: process.env.NODEMAILER_AUTH_PASS,
        },
    });

    const mailOptions = {
        from: process.env.NODEMAILER_AUTH_USER, // sender address
        to: receiverEmail, // receiver's email address
        subject: "Node Js Mail Testing", // Subject line
        text: "Your registration is successful", // plain text body
        attachments: [
            {
                filename: 'images.jpeg',
                path: './src/utils/Files/images/Apples.jpeg'   
            },
            {
                filename: ' .pdf',
                path: './src/utils/Files/pdf/Final CV Resume.pdf'   
            },
            {
                filename: 'document.pdf',
                path: '../../backend/Ecommarce/document.pdf'   
            }
        ]
        
    };

    transporter.sendMail(mailOptions, (error, emailResponse) => {
        if (error) throw error;
        console.log("Email sent successfully!");
    });
};

module.exports = sentMail;
