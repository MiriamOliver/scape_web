require('dotenv').config();
const { v4: uuidv4 } = require('uuid'); 
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: process.env.EMAIL_ACCOUNT,
        pass: process.env.EMAIL_PASSWORD
    },
    tls:{rejectUnauthorized:false}
})

const verificarCorreo = (userId, receptor, ruta) => {
    message = {
        from: process.env.EMAIL_ACCOUNT,
        to: receptor,
        subject: "Verificación de cuenta Sengoku",
        html: `Pulsa en el enlace para confirmar tu cuenta: <a href="http://${process.env.HOST}:${process.env.PORT}/${ruta}/${userId}">Pulsa aquí</a>`
    };


    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log(error.message)
        } else {
            console.log('Email enviado' + info.response);
        } 
    });
}

const emailRecPasswd = (userId, receptor) => {
    message = {
        from: process.env.EMAIL_ACCOUNT,
        to: receptor,
        subject: "Recuperar password",
        html: `Pulsa en el enlace para generar una nueva contraseña: <a href="http://${process.env.HOST_CLIENT}:${process.env.PORT_CLIENT}/auth/recpasswd/${userId}">Pulsa aquí</a>`
    };


    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log(error.message)
        } else {
            console.log('Email enviado' + info.response);
        } 
    });
}

module.exports = {
    verificarCorreo,
    emailRecPasswd
}

