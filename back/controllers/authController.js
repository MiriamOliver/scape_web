const { Sequelize } = require("sequelize");
const ConexionSequelize = require('./Conexion/ConexionUsuario');
const fHTML = require('../helpers/filesHtml');
const { generarJWT } = require('../helpers/generate_jwt');
const path = require('path');
const fs   = require('fs');


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

    const login =  (req = request, res = response) => {
        const conx = new ConexionSequelize();
        conx.loginUsuario(req)    
            .then( user => {
                const resp = {
                    success: true,
                    msg: '¡Logueado correctamente!. Bienvenido a Sengoku',
                    data: {
                        id: user.id,
                        nombre: user.nombre,
                        rol: user.rol,
                        avatar: user.avatar,
                        token: generarJWT(user.id),
                    },
                }
                res.status(200).json(resp);
            })
            .catch ( err => {
                res.status(203).json({success:false, msg:'¡Error!. Fallo en el Login', err});
            });
    }


    const mostrarImg = (req, res = response) => {

        if (req.params.img) {
            const pathImagen = path.join(__dirname, '../uploads', 'imgs', req.params.img);
            console.log(pathImagen);
            if (fs.existsSync(pathImagen)) {
                return res.sendFile(pathImagen)
            }
        }
    }

    module.exports = {
        register,
        verificarCorreo,
        login,
        mostrarImg
    }