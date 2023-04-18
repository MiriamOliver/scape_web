const { Sequelize } = require("sequelize");
const ConexionSequelize = require('./Conexion/ConexionUsuario');
const fHTML = require('../helpers/filesHtml');
const { generarJWT } = require('../helpers/generate_jwt');
const { googleVerify } = require('../helpers/google-verify');
const path = require('path');
const fs   = require('fs');
const correo = require('../helpers/correo')


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
                        token: generarJWT(user.id, user.nombre, user.rol, user.avatar),
                    },
                }
                res.status(200).json(resp);
            })
            .catch ( err => {
                res.status(203).json({success:false, msg:'¡Error!. Fallo en el Login', err});
            });
    }

    const loginWithGoogle = async(req, res = response) => {

/*         const { id_token } = req.body;

        try {
            const { correo, nombre, img } = await googleVerify( id_token );
            const token = generarJWT(correo);
            res.status(200).json({correo, nombre, img, token});
            
        } catch (error) {
            res.status(400).json({
                msg: 'Token de Google no es válido'
            })
        } */
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

    const emailPasswd = (req, res = response) => {
        const conx = new ConexionSequelize();
        conx.getIdUser(req.body.email)
        .then(resp => {
            correo.emailRecPasswd(resp, req.body.email)
        }).catch(err => {
            res.send({success:false, msg:'¡Error!. Fallo en la recuperación de contraseña', err});
        });
    }

    const verificarRestaurarPasswd = (req, res = response) => {
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
        verificarCorreo,
        login,
        loginWithGoogle,
        mostrarImg,
        emailPasswd
    }