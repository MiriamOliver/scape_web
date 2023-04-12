const { Sequelize } = require("sequelize");
const ConexionSequelize = require('./Conexion/ConexionUsuario');
const fHTML = require('../helpers/filesHtml');


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

    const verificarCorreo = (req, res = response) => {
        const conx = new ConexionSequelize();
        conx.updateVerificarCorreo(req.params.id)
            .then(resp => {
                if (resp) res.send(fHTML.exitoVerificar());
                else res.send(fHTML.errorVerificar());
    
            }).catch(err => {
                res.send(fHTML.errorVerificar());
            });
    }

    module.exports = {
        register,
        verificarCorreo
    }