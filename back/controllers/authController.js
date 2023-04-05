const { Sequelize } = require("sequelize");
const ConexionSequelize = require('./Conexion/ConexionUsuario');


  const register =  (req = request, res = response) => {
    console.log('hablame')
    const conx = new ConexionSequelize();
    conx.registrarUsuario(req)    
        .then( msg => {
            res.status(201).json({'msg':'¡Registrado correctamente!. Revise su correo electrónico para verificar su registro'});
        })
        .catch ( err => {
            res.status(203).json({'msg':'¡Error!. Fallo en el registro', err});
        });
    }

    module.exports = {
        register,
    }