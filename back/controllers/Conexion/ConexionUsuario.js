const moment = require('moment');
const ConexionSequelize = require('./ConexionSequelize');
const { v4: uuidv4 } = require('uuid');
const { Sequelize } = require("sequelize");
const models = require('../../models/index.js');
const File = require('../../helpers/file_upload');
const correo = require('../../helpers/correo');
const libreria = require('../../helpers/libreria')
const { Op } = require('sequelize');
const { QueryTypes } = require('sequelize');


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

        if(datos.rol == 'administrador'){
            await models.Jugador.update({
                activo: 1},
                {where: {id:datos.id}})
        }

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

            if(req.body.rol == 'administrador'){
                await models.Jugador.update({
                    activo: 1},
                    {where: {id:req.body.id}})
            }

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

    updatePerfil = async (req) => {
        if(req.files){
            const nombre = await File.subirArchivo(req.files, undefined, 'imgs' );
            await models.User.update({
                nombre: req.body.nombre,
                avatar:nombre
            },
            {where: {id:req.body.id}});
        }else{
            await models.User.update({
                nombre: req.body.nombre,
            },
            {where: {id:req.body.id}});
        }

        const usuario = await models.User.findOne({
            attributes:['id','nombre','avatar'],
            where: {id:req.body.id}
        })
        return usuario.dataValues;
    }

    updatePasswd = async (req) => {

        await models.User.update({
            password: req.body.passwd,
        },
        {where: {id:req.body.id}});

        const usuario = await models.User.findOne({
            attributes:['id','nombre','avatar'],
            where: {id:req.body.id}
        })
        return usuario.dataValues;
    }

    updateHabilitar = async (id) => {
        const habilitar = await models.User.update({
            habilitado: 0,
            conectado: 0,
        },
        {where: {id:id}});

        return habilitar;
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
                await this.insertarJugador(usuario.dataValues.id);
                if(rol == 'jugador'){
                    await models.Jugador.update({
                        activo: 0},
                        {where: {id:usuario.dataValues.id}})
                }else if(rol == 'adminitrador'){
                    await models.Jugador.update({
                        activo: 1},
                        {where: {id:usuario.dataValues.id}})
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

    getRanking = async () => {
        const jugadores = await models.sequelize.query(`SELECT jugadores.id, jugadores.partidas, jugadores.ganadas, jugadores.perdidas, jugadores.llaves, 
                                                        users.nombre, users.avatar FROM jugadores 
                                                        JOIN users ON jugadores.id=users.id 
                                                        WHERE users.verifiedAt IS NOT NULL AND jugadores.activo = 0
                                                        ORDER BY jugadores.ganadas + jugadores.llaves - jugadores.perdidas DESC;`, 
                                                        { type: QueryTypes.SELECT });

        return jugadores;
    }

    postMensajeForo = async(datos) => {
        
        await models.Foro.create({
            id_user: datos.id_user,
            mensaje: datos.message,
            tipo: datos.tipo
        })

        const mensaje = await models.sequelize.query(`SELECT users.id AS id_user, users.nombre, users.avatar, roles.rol, foros.id, foros.mensaje, foros.tipo
                                                        FROM foros JOIN users ON users.id = foros.id_user 
                                                        JOIN rolesasignados on rolesasignados.id_user = users.id 
                                                        JOIN roles ON roles.id=rolesasignados.id_rol
                                                        ORDER BY foros.id DESC;`,
                                                        { type: QueryTypes.SELECT });
                                              
        return mensaje;
    }

    postArchivoForo = async(req) => {

        const nombre = await File.subirArchivo(req.files, undefined, 'imgs' );

        const archivo = await models.Foro.create({
            id_user: req.body.id_user,
            mensaje: nombre,
            tipo: req.body.tipo
        })

        return archivo;
    }

    getMensajeForo = async() => {
        
        const mensaje = await models.sequelize.query(`SELECT users.id AS id_user, users.nombre, users.avatar, roles.rol, foros.id, foros.mensaje, foros.tipo 
                                                        FROM foros JOIN users ON users.id = foros.id_user 
                                                        JOIN rolesasignados on rolesasignados.id_user = users.id 
                                                        JOIN roles ON roles.id=rolesasignados.id_rol
                                                        ORDER BY foros.id DESC;`,
                                                        { type: QueryTypes.SELECT });

                                               
        return mensaje;
    }

    getConectadosForo = async(datos) => {

        console.log('probando conectados')
        console.log(datos);
        const user = await models.UsuarioForo.findOne({
            attributes: ['id'],
            where:{id_user: datos.id_user}
        })

        if(!user){
            await models.UsuarioForo.create({
                id_user: datos.id_user,
            })
        }

        const usuarios = await models.sequelize.query(`SELECT users.nombre, users.avatar, usuarioforos.id_user, roles.rol FROM usuarioforos 
                                                        JOIN users ON usuarioforos.id_user=users.id 
                                                        JOIN rolesasignados ON rolesasignados.id_user=users.id 
                                                        JOIN roles ON roles.id=rolesasignados.id_rol;`,
                                                        { type: QueryTypes.SELECT });
    
        return usuarios;
    }

    getDesconectadosForo = async(datos) => {

        const user = await models.UsuarioForo.findAll({
            where:{id_user: datos.id_user}
        })

        if(user){
            await models.UsuarioForo.destroy({
                where: {id_user: datos.id_user}
            })
        }

        const usuarios = await models.sequelize.query(`SELECT users.nombre, users.avatar, usuarioforos.id_user, roles.rol FROM usuarioforos 
                                                        JOIN users ON usuarioforos.id_user=users.id 
                                                        JOIN rolesasignados ON rolesasignados.id_user=users.id 
                                                        JOIN roles ON roles.id=rolesasignados.id_rol;`,
                                                        { type: QueryTypes.SELECT });
    
        return usuarios;
    }

    usuarioRol = async(id, rol) => {
        const idRol = await models.Rol.findOne({
            attribute:['id'],
            where:{rol: rol}
        });
        const admin = await models.RolesAsignados.findOne({
            where:{id_user:id,
                   id_rol: idRol.dataValues.id}
        })

        return admin
    }

    getUsuarioExiste = async(id) => {
        const usuario = models.User.findOne({
            where:{id:id}
        })

        return usuario;
    }
}


module.exports = ConexionUsuario;
