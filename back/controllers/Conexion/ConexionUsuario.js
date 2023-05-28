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
                password: req.body.password,
                habilitado: 1,
                verifiedAt:{[Op.ne]: null}
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

    getUsuario = async(id) => {

        const user = await models.User.findOne({
            where: { id:id },
            include: [
                {
                    model: models.RolesAsignados,
                    attributes: [],
                    as: 'RolesAsignados',
                    include: [
                        {
                            model: models.Rol,
                            attributes: [],
                            as: 'Rol'
                        }
                    ]
                }
            ],
            attributes: ['id','nombre','avatar','email','habilitado',
                        [Sequelize.col('RolesAsignados.Rol.rol'), 'rol'],
                    ]
        }); 

        return user.dataValues;
    }

    listaUsuarios = async() => {

        const users = await models.User.findAll({
            where: { verifiedAt:{[Op.ne]: null}},
            include: [
                {
                    model: models.RolesAsignados,
                    attributes: [],
                    as: 'RolesAsignados',
                    include: [
                        {
                            model: models.Rol,
                            attributes: [],
                            as: 'Rol'
                        }
                    ]
                }
            ],
            attributes: ['id','nombre','avatar','email','habilitado',
                        [Sequelize.col('RolesAsignados.Rol.rol'), 'rol'],
                    ]
        }); 

        return users;
    }

    bloqueoUsuarios =async(datos) => {

        await models.User.update({
            habilitado: datos.habilitado
        },
        {where: {id:datos.id_user}})

        let users = this.listaUsuarios();

        return users;

    }

    actualizarUsuarios =async(datos) => {

        let idRol = await models.Rol.findOne({
                attributes: ['id'],
                where: {rol:datos.rol}
        })

        await models.RolesAsignados.update({
            id_rol: idRol.dataValues.id},
            {where:{id_user:datos.id}
        })

        if(datos.avatar == ''){
            await models.User.update({
                nombre: datos.nombre
            },
            {where: {id:datos.id}})

        }

        let users = this.listaUsuarios();

        return users; 

    }

    updateUsuario = async (req) => {

        try{

            let idRol = await models.Rol.findOne({
                attributes: ['id'],
                where: {rol:req.body.rol}
            })

            await models.RolesAsignados.update({
                id_rol: idRol.dataValues.id},
                {where:{id_user:req.body.id}
            })

            const nombre = await File.subirArchivo(req.files, undefined, 'imgs' );

            const usuario = await models.User.update({
                nombre: req.body.nombre,
                avatar:nombre
            },
            {where: {id:req.body.id}});
        
            return usuario;
            
        }catch (err){
            throw err;
        }
    }

    crearUsuario = async (datos, avatar) => {

        let rol = '';

        try{
            
            const usuario = await models.User.create({
                nombre: datos.nombre,
                email: datos.email,
                password: datos.password,
                avatar: avatar
            });

            if(usuario){
                if(datos.rol == 'aleatorio'){
                    let tipoRol = ['jugador', 'administrador'];
                    let alea = Math.trunc(Math.random() * tipoRol.length);
                    rol = tipoRol[alea];
                }else{
                    rol = datos.rol;
                }

                const idRol = await this.getIdRol(rol);
                await this.asignarRol(usuario.dataValues.id, idRol.dataValues.id);
                if(rol == 'jugador'){
                    await this.insertarJugador(usuario.dataValues.id);
                }
                if(datos.verificado == 'no'){
                    correo.verificarCorreo(usuario.dataValues.id, usuario.dataValues.email, 'verificarcorreo');
                }else{
                    await usuario.update({verifiedAt: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')});
                }
            }

            return usuario.dataValues;
            
        }catch (err){
            throw err;
        }
    }
}


module.exports = ConexionUsuario;
