const moment = require('moment');
const ConexionSequelize = require('./ConexionSequelize');
const path = require('path');
const fs   = require('fs');
const { v4: uuidv4 } = require('uuid');
const { Sequelize } = require("sequelize");
const models = require('../../models/index.js');
const File = require('../../helpers/file_upload');
const correo = require('../../helpers/correo')


class ConexionUsuario extends ConexionSequelize {

    constructor() {
        super();
    }

    registrarUsuario = async (req) => {
        try{
            //const nombre = await File.subirArchivo(req.body.avatar, undefined, 'imgs' );

            const usuario = await models.User.create({
                nombre: req.body.nombre,
                email: req.body.email,
                password: req.body.password,
                //avatar:nombre
            });
            if(usuario){

                const idRol = await this.getIdRol('jugador');
                await this.asignarRol(usuario.dataValues.id, idRol.dataValues.id);
                await this.insertarJugador(usuario.dataValues.id);
                correo.verificarCorreo(usuario.dataValues.id, usuario.dataValues.email, 'verificarcorreo');
                
            }

            return usuario.dataValues;
            
        }catch (err){
            throw err;
        }
    }


    asignarRol = async (idUser, idRol) => {
        const resp = await models.RolesAsignados.create({
            id_user: idUser,
            id_rol: idRol
        });
        return resp;
    }


    getIdRol = async (rol) => {
        
        const idRol = await models.Rol.findOne({
            attributes: ['id'],
            where: { rol: rol },
        });

        return idRol;
    }

    insertarJugador = async (idUser) => {
        const resp = await models.Jugador.create({
            id: idUser
        });
        return resp;
    }

    updateVerificarCorreo = async(id) => {  
        let resultado = null;

        try {
            const usuario = await models.User.findByPk(id);
            
            if (usuario) {      
                resultado = await usuario.update({verifiedAt: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')});
            }

            return resultado;
        }
        catch (err) {
            throw err;
        }
    }


    /* getUsuario = async (email) => {
        let resultado = 0;
        this.conectar();
        resultado = await models.User.findOne({
            where: { email: email },
        });
        this.desconectar();
        return resultado;
    } */
}


module.exports = ConexionUsuario;
