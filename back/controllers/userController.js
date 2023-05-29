const { Sequelize } = require("sequelize");
const ConexionSequelize = require('./Conexion/ConexionUsuario');
const path = require('path');
const fs   = require('fs');
const File = require('../helpers/file_upload');
const correo = require('../helpers/correo');
const { factoriaUsuario } = require('../factoria/factoriaUser');

const getUsuariosConectados = (req, res = response) => {
    const conex = new ConexionSequelize();
    conex.getConectados(req.params.rol, req.params.id)
        .then( users => {
            users.forEach(user => {
                user.avatar = process.env.URL + process.env.PORT + "/upload/" + user.avatar
            });
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(203).json({'msg':'No se han encontrado registros'});
        })
}

mostrarUsuario = (req, res = response) => {
    const conex = new ConexionSequelize();
    conex.getUsuario(req.params.id)
        .then( user => {
            user.avatar = process.env.URL + process.env.PORT + "/upload/" + user.avatar;
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(203).json({'msg':'No se han encontrado registros'});
        })
}

actualizarUsuario = (req, res = response) => {
    const conex = new ConexionSequelize();
    conex.updateUsuario(req)
        .then( user => {
            user.avatar = process.env.URL + process.env.PORT + "/upload/" + user.avatar;
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(203).json({'msg':'No se han encontrado registros'});
        })
}

crearUsuario = async (req, res = response) => {
    const conex = new ConexionSequelize();
    const nombre = await File.subirArchivo(req.files, undefined, 'imgs' );
    conex.crearUsuario(req.body, nombre)
        .then( user => {
            res.status(200).json({'msg':'Registrado con éxito'});
        })
        .catch(err => {
            res.status(203).json({'msg':'No se han encontrado registros'});
        })
}

generarUsuarios = async (req, res = response) => {
    let users = []
    let cantidad = parseInt(req.body.cantidad);

    while( cantidad > 0 ){
        let user = factoriaUsuario(req.body);
        const conex = new ConexionSequelize();
        conex.crearUsuario(user, user.avatar).then( user => {
            users.push(user);
            if(users.length == parseInt(req.body.cantidad)){
                res.status(200).json({'msg':'Registrado con éxito'});
            }
        })
        cantidad --;
    }
}

module.exports = {
    getUsuariosConectados,
    mostrarUsuario,
    actualizarUsuario,
    crearUsuario,
    generarUsuarios
}