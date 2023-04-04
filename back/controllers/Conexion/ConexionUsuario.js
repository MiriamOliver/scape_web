const ConexionSequelize = require('./ConexionSequelize');
const { Sequelize } = require("sequelize");
const models = require('../../models/index.js');


class ConexionUsuario extends ConexionSequelize {

    constructor() {
        super();
    }

    registrarUsuario = async (body) => {

        try{
            const usuario = await models.User.create({
                nombre: body.nombre,
                email: body.email,
                password:body.password
            });
            if(usuario){
                const idRol = await this.getIdRol('jugador');
                this.asignarRol(usuario.dataValues.id, idRol.dataValues.id);
                this.insertarJugador(usuario.dataValues.id);
            }
        }catch (err){
            throw err;
        }
        return usuario.dataValues;
    }


    asignarRol = async (idUser, idRol) => {

        await models.RolesAsignados.create({
            id_user: idUser,
            id_rol: idRol
        });
    }


    getIdRol = async (rol) => {
        
        const idRol = await models.Rol.findOne({
            attributes: ['id'],
            where: { rol: rol },
        });

        return idRol;
    }

    insertarJugador = async (idUser) => {
        await models.Jugador.create({
            id: idUser
        });
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
