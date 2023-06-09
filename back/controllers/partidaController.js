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

const conseguirPartida = ( req, res = response ) => {
    const conex = new ConexionSequelize();
    conex.getPartida(req.params.id)
        .then( resp => {
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

const partidasJugador = ( req, res = response ) => {
    const conex = new ConexionSequelize();
    conex.getPartidasHistorial(req.params.id)
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
            console.log(resp);
            res.status(200).json({msg:'Unirse a sala',
                                  id:resp.id,
                                  anfitrion:resp.anfitrion,
                                  estado:resp.estado,
                                });
        })
        .catch(err => {
            res.status(203).json({'msg':'No se han encontrado registros'});
        })
}

const finalizarPartida = ( req, res = response ) => {
    const conex = new ConexionSequelize();
    console.log(req.body);
    conex.resultadoFinalPartida(req.body)
        .then( resp => {
            res.status(200).json(resp);
        })
        .catch(err => {
            res.status(203).json({'msg':'No se han encontrado registros'});
        })
}

const getResultadoPartida = ( req, res = response ) => {
    const conex = new ConexionSequelize();
    console.log(req.body);
    conex.getResultadoFinalPartida(req.params.id)
        .then( resp => {
            res.status(200).json(resp);
        })
        .catch(err => {
            res.status(203).json({'msg':'No se han encontrado registros'});
        })
}

const getResultadoJugadorPartida = ( req, res = response ) => {
    const conex = new ConexionSequelize();
    console.log(req.body);
    conex.getResultadoFinalJugadorPartida(req.params.id)
        .then( jugadores => {
            jugadores.forEach(jugador => {
                jugador.avatar = process.env.URL + process.env.PORT + "/upload/" + jugador.avatar
            });
            res.status(200).json(jugadores);
        })
        .catch(err => {
            res.status(203).json({'msg':'No se han encontrado registros'});
        })
}

const mostrarPartida = ( req, res = response ) => {
    console.log(req.params.id);
    const conex = new ConexionSequelize();
    conex.getInfoPartida(req.params.id)
        .then( partida => {
            res.status(200).json(partida);
        })
        .catch(err => {
            res.status(203).json({'msg':'No se han encontrado registros'});
        })
}

module.exports = {
    crearPartida,
    partidasDisponibles,
    partidasCreadas,
    partidasEnCurso,
    unirseSala,
    conseguirPartida,
    finalizarPartida,
    getResultadoPartida,
    getResultadoJugadorPartida,
    mostrarPartida,
    partidasJugador
}