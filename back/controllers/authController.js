const { Sequelize } = require("sequelize");
const ConexionSequelize = require('./Conexion/ConexionUsuario');


  const register =  (req = request, res = response) => {
    const conx = new ConexionSequelize();
    conx.registrarUsuario(req)    
        .then( msg => {
            res.status(201).json({success:true, msg:'¡Registrado correctamente!. Revise su correo electrónico para verificar su registro'});
        })
        .catch ( err => {
            res.status(203).json({success:false, msg:'¡Error!. Fallo en el registro', err});
        });
    }

    module.exports = {
        register,
    }