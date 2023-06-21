require('dotenv').config();
const Conexion = require('../controllers/Conexion/ConexionUsuario');
const { response, request } = require('express');


const esAdmin = async (req, res, next) => {

    const conexion = new Conexion();
    conexion.usuarioRol(req.params.id, 'administrador')
    .then( admin => {
        next();
    })  
    .catch(err =>{
        res.status(403).json({ msg: 'No estás autorizado' });
    });                                                   
}

const esJugador = async (req, res, next) => {

    const conexion = new Conexion();
    conexion.usuarioRol(req.params.id, 'jugador')
    .then( admin => {
        next();
    })  
    .catch(err =>{
        res.status(403).json({ msg: 'No estás autorizado' });
    });                                                   
}

const usuarioExiste = async ( req, res, next) => {
    const conexion = new Conexion();
    conexion.getUsuarioExiste(req.params.id)
    .then( user => {
        next();
    })  
    .catch(err =>{
        res.status(403).json({ msg: 'Usuario no registrado' });
    });
}

const usuarioRegistrado = async ( req, res, next) => {
    const conexion = new Conexion();
    conexion.getUsuarioExiste(req.body.id)
    .then( user => {
        next();
    })  
    .catch(err =>{
        res.status(403).json({ msg: 'Usuario no registrado' });
    });
}

const esAnfitrion = async (req, res, next) => {

    const conexion = new Conexion();
    conexion.usuarioRol(req.body.anfitrion, 'jugador')
    .then( admin => {
        next();
    })  
    .catch(err =>{
        res.status(403).json({ msg: 'No estás autorizado' });
    });            
}

const esJugadorPartida = async (req, res, next) => {

    const conexion = new Conexion();
    conexion.usuarioRol(req.body.id_jugador, 'jugador')
    .then( admin => {
        next();
    })  
    .catch(err =>{
        res.status(403).json({ msg: 'No estás autorizado' });
    });            
}


module.exports = {
    esAdmin,
    esJugador,
    usuarioExiste,
    usuarioRegistrado,
    esJugadorPartida,
    esAnfitrion
}