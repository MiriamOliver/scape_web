const models = require('../models/index.js');

const emailExiste = async( email ) => {
    const existeEmail = await models.User.findOne({
        where: {"email": email}
    })
    if ( existeEmail ) {
        throw new Error(`El correo: ${ email }, ya está registrado`);
    }
}

const nombreExiste = async( nombre ) => {
    console.log(nombre);
    const existeNombre = await models.User.findOne({
        where: {"nombre": nombre}
    })
    if ( existeNombre ) {
        throw new Error(`El nombre: ${ nombre }, ya está registrado`);
    }
}

const emailDesconocido = async( email ) => {
    const desconocidoEmail = await models.User.findOne({
        where: {"email": email}
    })
    if ( !desconocidoEmail ) {
        throw new Error(`El correo: ${ email }, no está registrado`);
    }
}



module.exports = {
    emailExiste,
    nombreExiste,
    emailDesconocido
}