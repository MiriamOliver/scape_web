const { Sequelize } = require("sequelize");
const ConexionSequelize = require('./Conexion/ConexionUsuario');


  const register =  (req = request, res = response) => {
    const conx = new ConexionSequelize();
    conx.registrarUsuario(req.body)    
        .then( msg => {
            console.log('Insertado correctamente!');
            res.status(201).json({'msg':'¡Registrado correctamente!. Revise su correo electrónico para verificar su registro'});
        })
        .catch ( err => {
            res.status(203).json({'msg':'¡Error!. Fallo en el registro'});
        });
    }

    module.exports = {
        register,
    }