const { Sequelize } = require("sequelize");
const ConexionSequelize = require('./Conexion/ConexionEnigma');
const fHTML = require('../helpers/filesHtml');
const path = require('path');
const fs   = require('fs');
const { body } = require("express-validator");


const mostrarEnigma = ( req, res = response ) => {
    const conex = new ConexionSequelize();
    conex.getEnigma(req.params.id)
        .then( resp => {
            res.status(200).json(resp);
        })
        .catch(err => {
            res.status(203).json({'msg':'No se han encontrado registros'});
        })
}

const mostrarEnigmasCreados = ( req, res = response ) => {
    let listaEnigmas = [];
    const conex = new ConexionSequelize();
    conex.getEnigmasCreados(req.params.id)
        .then( enigmas => {
            enigmas.forEach(enigma => {
                listaEnigmas.push(enigma.dataValues);
            });
            res.status(200).json(listaEnigmas);
        })
        .catch(err => {
            res.status(203).json({'msg':'No se han encontrado registros'});
        })
} 

module.exports = {
    mostrarEnigma,
    mostrarEnigmasCreados
}