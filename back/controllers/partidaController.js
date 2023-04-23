const { Sequelize } = require("sequelize");
const ConexionSequelize = require('./Conexion/ConexionPartida');
const fHTML = require('../helpers/filesHtml');
const path = require('path');
const fs   = require('fs');

const crearPartida = (req, res = response) => {
    const conex = new ConexionSequelize();
    conex.createPartida(req.params.anfitrion)
        .then( resp => {
            res.status(200).json({msg:'Partida creada', resp});
        })
        .catch(err => {
            res.status(203).json({'msg':'No se han encontrado registros'});
        })
}



module.exports = {
    crearPartida,
}