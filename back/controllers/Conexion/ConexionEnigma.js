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
const { body } = require('express-validator');


class ConexionEnigma extends ConexionSequelize {

    constructor() {
        super();
    }

    getEnigma = async(id) => {

        let enigma = await models.Enigma.findOne({
            where:{id:id}
        })

        return {
            id: enigma.dataValues.id,
            creador:enigma.dataValues.creador,
            pregunta:enigma.dataValues.pregunta,
            opciones: [ enigma.dataValues.resp_uno, 
                        enigma.dataValues.resp_dos,
                        enigma.dataValues.resp_tres,
                        enigma.dataValues.resp_cuatro ],
            correcta: enigma.dataValues.correcta
        };
    }


    getEnigmasCreados = async(id) => {

        let nombre = await models.User.findOne({
            attributes:['nombre'],
            where:{id:id}
        })

        let enigmas = await models.Enigma.findAll({
            attributes: ['id','creador','pregunta'],
            where:{creador:nombre.dataValues.nombre}
        })

        console.log(enigmas);
        return enigmas
    }

    getEnigmas = async(id) => {

        let nombre = await models.User.findOne({
            attributes:['nombre'],
            where:{id:id.user}
        })

        let enigmas = await models.Enigma.findAll({
            attributes: ['id','creador','pregunta'],
            where:{creador:{[Op.notLike]: nombre.dataValues.nombre}}
        })

        return enigmas
    }

}

module.exports = ConexionEnigma;