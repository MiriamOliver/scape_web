const { Sequelize } = require("sequelize");
const ConexionSequelize = require('./Conexion/ConexionUsuario');
const path = require('path');
const fs   = require('fs');
const correo = require('../helpers/correo')

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

module.exports = {
    getUsuariosConectados
}