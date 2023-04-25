const moment = require('moment');
const ConexionSequelize = require('./ConexionSequelize');
const { v4: uuidv4 } = require('uuid');
const { Sequelize } = require("sequelize");
const models = require('../../models/index.js');
const File = require('../../helpers/file_upload');
const correo = require('../../helpers/correo');
const libreria = require('../../helpers/libreria')
const { Op } = require('sequelize');

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
        console.log(listaId);

        jugadores = await models.User.findAll({
            attributes:['id','nombre','avatar'],
            where: {id:{[Op.in]: listaId}}
        });
        
        return jugadores;
        
    }

}

module.exports = ConexionPartida;