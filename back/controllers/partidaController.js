const { Sequelize } = require("sequelize");
const ConexionSequelize = require('./Conexion/ConexionPartida');
const fHTML = require('../helpers/filesHtml');
const path = require('path');
const fs   = require('fs');
const { body } = require("express-validator");

const crearPartida = (req, res = response) => {
    const conex = new ConexionSequelize();
    conex.createPartida(req.body.anfitrion)
        .then( resp => {
            res.status(200).json({msg:'Partida creada',
                                  id:resp.id,
                                  anfitrion:resp.anfitrion,
                                  estado:resp.estado,
                                });
        })
        .catch(err => {
            res.status(203).json({'msg':'No se han encontrado registros'});
        })
}

const mostrarJugadoresSala = ( req, res = response ) => {
    const conex = new ConexionSequelize();
    conex.getJugadoresSala(req.params.id)
        .then( resp => {
            resp.forEach(element => {
                element.avatar = process.env.URL + process.env.PORT + "/upload/" + element.avatar;
            });
            res.status(200).json(resp);
        })
        .catch(err => {
            res.status(203).json({'msg':'No se han encontrado registros'});
        })
}

const partidasDisponibles = ( req, res = response ) => {
    const conex = new ConexionSequelize();
    conex.getPartidasDisponibles(req.params.id)
        .then( resp => {
            res.status(200).json(resp);
        })
        .catch(err => {
            res.status(203).json({'msg':'No se han encontrado registros'});
        })
}

const partidasCreadas = ( req, res = response ) => {
    const conex = new ConexionSequelize();
    conex.getPartidasCreadas(req.params.id)
        .then( resp => {

            res.status(200).json(resp);
        })
        .catch(err => {
            res.status(203).json({'msg':'No se han encontrado registros'});
        })
}

const partidasEnCurso = ( req, res = response ) => {
    const conex = new ConexionSequelize();
    conex.getPartidasEnCurso(req.params.id)
        .then( resp => {
            res.status(200).json(resp);
        })
        .catch(err => {
            res.status(203).json({'msg':'No se han encontrado registros'});
        })
}

const unirseSala = ( req, res = response ) => {
    const conex = new ConexionSequelize();
    conex.unirseSalaPartida(req.body)
        .then( resp => {

            res.status(200).json(resp);
        })
        .catch(err => {
            res.status(203).json({'msg':'No se han encontrado registros'});
        })
}

module.exports = {
    crearPartida,
    mostrarJugadoresSala,
    partidasDisponibles,
    partidasCreadas,
    partidasEnCurso,
    unirseSala
}