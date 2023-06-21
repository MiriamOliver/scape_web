require('dotenv').config();
const Conexion = require('../controllers/Conexion/ConexionPartida');
const { response, request } = require('express');

const existeSala = async (req, res, next) => {

    const conexion = new Conexion();
    conexion.getPartidaRegistrada(req.params.id)
    .then( partida => {
        next();
    })  
    .catch(err =>{
        res.status(403).json({ msg: 'No estás registrada' });
    });
}

const partidaRegistrada = async (req, res, next) => {

    const conexion = new Conexion();
    conexion.getPartidaRegistrada(req.body.id_partida)
    .then( partida => {
        next();
    })  
    .catch(err =>{
        res.status(403).json({ msg: 'No estás registrada' });
    });
}

module.exports = {
    existeSala,
    partidaRegistrada
}