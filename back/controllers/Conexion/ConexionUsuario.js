const moment = require('moment');
const ConexionSequelize = require('./ConexionSequelize');
const { v4: uuidv4 } = require('uuid');
const { Sequelize } = require("sequelize");
const models = require('../../models/index.js');
const File = require('../../helpers/file_upload');
const correo = require('../../helpers/correo');
const libreria = require('../../helpers/libreria')
const { Op } = require('sequelize');


class ConexionUsuario extends ConexionSequelize {

    constructor() {
        super();
    }

    registrarUsuario = async (req) => {

        try{
            const nombre = await File.subirArchivo(req.files, undefined, 'imgs' );

            const usuario = await models.User.create({
                nombre: req.body.nombre,
                email: req.body.email,
                password: req.body.password,
                avatar:nombre
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

    loginUsuario = async (req) => {

        const user = await models.User.findOne({
            attributes: ['id', 'nombre', 'avatar'],
            where : {
                email: req.body.email,
                password: req.body.password
            },

            include: 'RolesAsignados'
        });
        
        const idRol = user.dataValues.RolesAsignados[0].dataValues.id_rol;
        const rol = await models.Rol.findByPk(idRol);

        await models.User.update({conectado: 1}, 
                                {where: {id:user.dataValues.id}});

        return {
            id: user.dataValues.id,
            avatar: process.env.URL + process.env.PORT + "/upload/" + user.dataValues.avatar,
            nombre: user.dataValues.nombre,
            rol: rol.dataValues.rol,
        };
    }

    logoutUsuario = async(id) => {

        let result = await models.User.update({conectado: 0}, 
                                          {where: {id:id}});

        return result;
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

    enviarCodigo = async(email) => {
        let resultado = null

        try{
            const idUser = await this.getIdUser(email);
            const usuario = await models.User.findByPk(idUser);

            if(usuario){

                const codigo = libreria.generarCodigo();
                resultado = await usuario.update({cod_passwd: codigo});
                if(resultado){
                    correo.emailRecPasswd(email, codigo);
                }
                
            }

            return resultado;

        }catch (err) {
            throw err;
        }
         
    }
    
    restaurarPasswd = async (codigo, passwd) => {
        let resultado = null

        try{
            const idUser = await models.User.findOne({
                attributes: ['id'],
                where: { cod_passwd: codigo },
            });

            const usuario = await models.User.findByPk(idUser.dataValues.id);

            if(usuario){

                resultado = await usuario.update({password: passwd});
                
            }

            return resultado;

        }catch (err) {
            throw err;
        }
    }


    getIdUser = async (email) => {
        const idUser = await models.User.findOne({
            attributes: ['id'],
            where: { email: email },
        });

        return idUser.dataValues.id;
    } 

    getConectados = async(rol, id) => {

        let resultado = []
        if ( rol == 'jugador' ){

            const idRol = await this.getIdRol(rol);

            resultado = await models.User.findAll({
                where: { conectado: 1, id:{[Op.ne]: id} },
                include:[{
                    model: models.RolesAsignados,
                    as: 'RolesAsignados',
                    where: { id_rol: idRol.dataValues.id}
               }] 
            });
    
        }else if ( rol == 'administrador' ){
            resultado = await models.User.findAll({
                where: { conectado: 1, id:{[Op.ne]: id} },
            });
        }
        return resultado
    }
}




module.exports = ConexionUsuario;
