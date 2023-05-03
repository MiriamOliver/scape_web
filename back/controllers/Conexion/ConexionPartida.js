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

class ConexionPartida extends ConexionSequelize {

    constructor() {
        super();
    }

    createPartida = async(anfitrion) => {
        console.log(anfitrion);
        try{

            const partida = await models.Partida.create({
                anfitrion: anfitrion,
                estado: 'disponible',
            });

            if(partida){

                await models.PartidaJugador.create({
                    id_jugador: anfitrion,
                    id_partida: partida.dataValues.id,
                })                
            }

            return partida.dataValues;
            
        }catch (err){
            
            throw err;
        }
    }

    getJugadoresSala = async(id) => {

        let jugadores = [];
        let listaId = [];
        
        let idJugadores = await models.PartidaJugador.findAll({
                            attributes:['id_jugador'],
                            where:{id_partida:id}
                        });
        
        idJugadores.forEach(element => {
            listaId.push(element.dataValues.id_jugador)
        });

        jugadores = await models.User.findAll({
            attributes:['id','nombre','avatar'],
            where: {id:{[Op.in]: listaId}}
        });
        
        console.log(jugadores);
        return jugadores;
        
    }

    getPartidasDisponibles = async(id) => {

        let resultado = null;

        resultado = await models.sequelize.query(`SELECT partidas.id, partidas.anfitrion, partidas.estado, users.nombre, 
                                                  COUNT(partidasjugadores.id_jugador) AS 'jugadores' FROM partidas JOIN users ON partidas.anfitrion=users.id 
                                                  JOIN partidasjugadores ON partidas.id=partidasjugadores.id_partida WHERE estado='disponible' AND anfitrion != ?  
                                                  GROUP BY partidasjugadores.id_partida;`, { replacements: [id], type: QueryTypes.SELECT });
        return resultado;  
    }

    getPartidasCreadas = async(id) => {

        let resultado = null;

        resultado = await models.sequelize.query(`SELECT partidas.id, partidas.anfitrion, partidas.estado, users.nombre, 
                                                  COUNT(partidasjugadores.id_jugador) AS 'jugadores' FROM partidas JOIN users ON partidas.anfitrion=users.id 
                                                  JOIN partidasjugadores ON partidas.id=partidasjugadores.id_partida WHERE estado='disponible' AND anfitrion = ? 
                                                  GROUP BY partidasjugadores.id_partida;`, { replacements: [id], type: QueryTypes.SELECT });
        
        return resultado;  
    }

    getPartidasEnCurso = async(id) => {

        let resultado = null;

        resultado = await models.sequelize.query(`SELECT partidas.id, partidas.anfitrion, partidas.estado, users.nombre, 
                                                  COUNT(partidasjugadores.id_jugador) AS 'jugadores' FROM partidas JOIN users ON partidas.anfitrion=users.id 
                                                  JOIN partidasjugadores ON partidas.id=partidasjugadores.id_partida WHERE estado = 'curso' AND partidasjugadores.id_jugador = ? 
                                                  GROUP BY partidasjugadores.id_partida;`, { replacements: [id], type: QueryTypes.SELECT });
        return resultado;
    }

    unirseSalaPartida = async(body) => {
        
        console.log(body);
        let result = '';

        result = await models.PartidaJugador.findOne({
            where:{id_partida: body.id_partida, id_jugador:body.id_jugador}
        })
        if(!result){
            await models.PartidaJugador.create({
                id_partida:body.id_partida, 
                id_jugador:body.id_jugador
            })
        }
        return result;
    }

}

module.exports = ConexionPartida;