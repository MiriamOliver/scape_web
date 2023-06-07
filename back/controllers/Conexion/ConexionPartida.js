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
        

        return jugadores;
        
    }

    getPartida = async(id) =>{

        let result = await models.Partida.findOne({
            attributes:['id','anfitrion','estado'],
            where: {id:id}
        })

        return result.dataValues;
    }

    getInfoPartida = async(id) => {

        console.log('conseguir partida')
        let resultado = null;
        let datos = {id_partida:id};
        let listaJugadores = [];

        resultado = await models.sequelize.query(`SELECT partidas.id, partidas.anfitrion, partidas.tiempo, partidas.llaves, partidas.estado, partidas.resultado, users.nombre, 
                                                COUNT(partidasjugadores.id_jugador) AS 'jugadores' FROM partidas JOIN users ON partidas.anfitrion=users.id 
                                                JOIN partidasjugadores ON partidas.id=partidasjugadores.id_partida WHERE partidas.id = ? 
                                                GROUP BY partidasjugadores.id_partida;`, { replacements: [id], type: QueryTypes.SELECT });
        
        let jugadores = await this.usuariosPartida(datos);

        jugadores.forEach(jugador => {
            jugador.dataValues.avatar = process.env.URL + process.env.PORT + "/upload/" + jugador.dataValues.avatar;
            listaJugadores.push(jugador.dataValues);
        });

        return  {
                    id:resultado[0].id,
                    resultado:resultado[0].resultado,
                    creador:resultado[0].nombre,
                    tiempo:resultado[0].tiempo,
                    llaves:resultado[0].llaves,
                    cant_jug:resultado[0].jugadores,
                    jugadores:listaJugadores
                }      
    }

    getPartidasDisponibles = async(id) => {

        let resultado = null;

        resultado = await models.sequelize.query(`SELECT partidas.id, partidas.anfitrion, partidas.estado, users.nombre, 
                                                  COUNT(partidasjugadores.id_jugador) AS 'jugadores' FROM partidas JOIN users ON partidas.anfitrion=users.id 
                                                  JOIN partidasjugadores ON partidas.id=partidasjugadores.id_partida WHERE estado='disponible' 
                                                  GROUP BY partidasjugadores.id_partida;`, { type: QueryTypes.SELECT });

        /* resultado = await models.sequelize.query(`SELECT partidas.id, partidas.anfitrion, partidas.estado, users.nombre, 
                                                  COUNT(partidasjugadores.id_jugador) AS 'jugadores' FROM partidas JOIN users ON partidas.anfitrion=users.id 
                                                  JOIN partidasjugadores ON partidas.id=partidasjugadores.id_partida WHERE estado='disponible' AND anfitrion != ?  
                                                  GROUP BY partidasjugadores.id_partida;`, { replacements: [id], type: QueryTypes.SELECT }); */
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

    getPartidasHistorial = async(id) => {

        let resultado = null;

        resultado = await models.sequelize.query(`SELECT partidas.id, partidas.anfitrion, partidas.tiempo, partidas.resultado, users.nombre, 
                                                  COUNT(partidasjugadores.id_jugador) AS 'jugadores' FROM partidas JOIN users ON partidas.anfitrion=users.id 
                                                  JOIN partidasjugadores ON partidas.id=partidasjugadores.id_partida WHERE partidas.estado = 'terminada' AND partidas.id IN
                                                  (SELECT id_partida FROM partidasjugadores WHERE id_jugador = ?)   
                                                  GROUP BY partidasjugadores.id_partida;`, { replacements: [id], type: QueryTypes.SELECT });
        return resultado;
    }

    unirseSalaPartida = async(body) => {

        let partida = '';
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

        partida = await models.Partida.findOne({
            where:{id: body.id_partida}
        });

        return partida.dataValues;
    }

    empezarPartida = async(datos) => {
        
        let partida = '';

        await models.Partida.update({estado: 'curso'}, 
            {where: {id:datos.id_partida}}
            );

        partida = await models.Partida.findOne({
            where : {id:datos.id_partida}
        })
        return partida.dataValues;
    }

    mensajesPartida = async(data, mensaje)=> {

        try{

            let user = await models.User.findOne({
                attributes:['id','nombre','avatar'],
                where:{nombre: data.nombre}
            })

            await models.Chat.create({
                id_user:user.dataValues.id,
                id_partida: data.id,
                mensaje: mensaje.message
            });

            return {
                id_partida:data.id,
                id_user: user.dataValues.id,
                avatar: process.env.URL + process.env.PORT + "/upload/" + user.dataValues.avatar,
                nombre: user.dataValues.nombre,
                msg: mensaje.message
            };

        }catch(err){
            throw err;
        }
    }

    usuariosPartida = async(datos) => {
       
       try{
            let jugador = await models.User.findAll({
                include:[{
                    model: models.PartidaJugador,
                    as: 'PartidasJugadores',
                    attributes:[],
                    where: { id_partida: datos.id_partida}
                }],
                attributes: ['id','nombre','avatar', 
                            [Sequelize.col('PartidasJugadores.id_partida'), 'id_partida'],
                            [Sequelize.col('PartidasJugadores.llaves'), 'llaves'],
                            [Sequelize.col('PartidasJugadores.fallos'), 'fallos'],
                            [Sequelize.col('PartidasJugadores.activo'), 'activo'],
                            [Sequelize.col('PartidasJugadores.rol'), 'rol'],
                        ]
            }); 

            console.log(jugador);
            console.log('que pasa')

           return jugador;
    
        }catch(err){
            throw err;
        }
    }

    usuarioDesconectado = async(datos) => {
       console.log(datos);
        try{

            if(datos.id_anfitrion != datos.id_user){
                await models.PartidaJugador.destroy({
                    where:{
                        id_jugador:datos.id_user,
                        id_partida: datos.id_partida
                    }
                })
            }else if(datos.id_anfitrion == datos.id_user){
                await models.PartidaJugador.destroy({
                    where:{
                        id_partida: datos.id_partida
                    }
                });

                await models.Partida.destroy({
                    where:{id:datos.id_partida}
                })
            }

             let jugador = await models.User.findAll({
                 include:[{
                     model: models.PartidaJugador,
                     as: 'PartidasJugadores',
                     attributes:[],
                     where: { id_partida: datos.id_partida}
                 }],
                 attributes: ['id','nombre','avatar', 
                             [Sequelize.col('PartidasJugadores.id_partida'), 'id_partida'],
                             [Sequelize.col('PartidasJugadores.llaves'), 'llaves'],
                             [Sequelize.col('PartidasJugadores.fallos'), 'fallos'],
                             [Sequelize.col('PartidasJugadores.activo'), 'activo'],
                             [Sequelize.col('PartidasJugadores.rol'), 'rol'],
                         ]
             }); 
 
            return jugador;
     
         }catch(err){
             throw err;
         }
    }

    getEnigma = async(datos) => {

        let enigmas = await models.Enigma.findAll();

        let alea = Math.trunc(Math.random() * enigmas.length);
        
        let enigma = enigmas[alea].dataValues;

        return{
            id:enigma.id,
            pregunta:enigma.pregunta,
            correcta:enigma.correcta,
            opciones: [
                enigma.resp_uno,
                enigma.resp_dos,
                enigma.resp_tres,
                enigma.resp_cuatro
            ]
        }
    }

    updatePartida = async(datos) => {
        console.log(datos);
        let partida = '';

        await models.Partida.update({llaves: datos.llaves}, 
            {where: {id:datos.id_partida}}
            );

        partida = await models.Partida.findOne({
            attributes:['id','llaves','anfitrion','tiempo','estado'],
            where : {id:datos.id_partida}
        })
        return partida.dataValues;
    }

    updatePartidaJugador = async(datos) => {
        
        if(datos.llaves > 0){
            let almirante = await models.PartidaJugador.findOne({
                where:{id_partida:datos.id_partida,
                        rol: 'almirante'}
            })

            if(almirante == null){
                await models.PartidaJugador.update({rol: 'almirante'}, 
                            {where:{id_partida: datos.id_partida, 
                            id_jugador: datos.id_user}}
                        );
            }
        }

        await models.PartidaJugador.update({llaves: datos.llaves, 
                                            fallos: datos.fallos}, 
            {where:{id_partida: datos.id_partida, 
                    id_jugador: datos.id_user}}
            );

        let jugador = await models.User.findAll({
                include:[{
                    model: models.PartidaJugador,
                    as: 'PartidasJugadores',
                    attributes:[],
                    where: { id_partida: datos.id_partida}
                }],
                attributes: ['id','nombre','avatar', 
                            [Sequelize.col('PartidasJugadores.id_partida'), 'id_partida'],
                            [Sequelize.col('PartidasJugadores.llaves'), 'llaves'],
                            [Sequelize.col('PartidasJugadores.fallos'), 'fallos'],
                            [Sequelize.col('PartidasJugadores.activo'), 'activo'],
                            [Sequelize.col('PartidasJugadores.rol'), 'rol'],
                        ]
            }); 

           return jugador;
    } 

    activarJugador = async(datos) => {

        await models.PartidaJugador.update({
                                            activo: datos.activo}, 
                                            {where:{id_partida: datos.id_partida, 
                                            id_jugador: datos.id_user}}
            );

            let jugador = await models.User.findAll({
                include:[{
                    model: models.PartidaJugador,
                    as: 'PartidasJugadores',
                    attributes:[],
                    where: { id_partida: datos.id_partida}
                }],
                    attributes: ['id','nombre','avatar', 
                    [Sequelize.col('PartidasJugadores.id_partida'), 'id_partida'],
                    [Sequelize.col('PartidasJugadores.llaves'), 'llaves'],
                    [Sequelize.col('PartidasJugadores.fallos'), 'fallos'],
                    [Sequelize.col('PartidasJugadores.activo'), 'activo'],
                    [Sequelize.col('PartidasJugadores.rol'), 'rol'],
                ]
            }); 

            return jugador;

    }

    contestarJugador = async(datos) => {

            let jugador = await models.User.findAll({
                include:[{
                    model: models.PartidaJugador,
                    as: 'PartidasJugadores',
                    attributes:[],
                    where: { id_partida: datos.id_partida}
                }],
                    attributes: ['id', 
                    [Sequelize.col('PartidasJugadores.id_partida'), 'id_partida'],
                    [Sequelize.col('PartidasJugadores.activo'), 'activo'],
                ]
            }); 

            return jugador;
    }

    resultadoFinalPartida = async(body) => {
        await models.Partida.update({resultado: body.resultado, 
                                     tiempo: body.tiempo,
                                     estado: 'terminada'}, 
                                {where:{id: body.id}}
                                );

        if(body.resultado =='ganada'){

            models.sequelize.query(`UPDATE jugadores SET ganadas = ganadas + 1, partidas = partidas + 1, llaves = llaves + ? WHERE id = ?;`, 
                                    { replacements: [body.llaves, body.id_user], type: QueryTypes.UPDATE });

        }else{

            models.sequelize.query(`UPDATE jugadores SET perdidas = perdidas + 1, partidas = partidas + 1, llaves = llaves + ? WHERE id = ?;`, 
                                    { replacements: [body.llaves, body.id_user], type: QueryTypes.UPDATE });

        }                     
        return {id: body.id};
    }

    getResultadoFinalPartida = async(id) => {

        let partida = await models.Partida.findOne({
            attributes:['id','llaves', 'tiempo', 'resultado'],
            where:{id:id}
        })

        return partida.dataValues;
    }

    getResultadoFinalJugadorPartida = async(id) => {

        let jugador = await models.User.findAll({
            include:[{
                model: models.PartidaJugador,
                as: 'PartidasJugadores',
                attributes:[],
                where: { id_partida: id}
            }],
            attributes: ['id','nombre','avatar', 
                        [Sequelize.col('PartidasJugadores.llaves'), 'llaves'],
                        [Sequelize.col('PartidasJugadores.fallos'), 'fallos'],
                        [Sequelize.col('PartidasJugadores.rol'), 'rol'],
                    ]
        }); 

        console.log(jugador);

       return jugador;
    }

    listaPartidas = async() => {

        console.log('entramos en lista partidas')
        let resultado = null;

        resultado = await models.sequelize.query(`SELECT partidas.id, partidas.anfitrion, partidas.tiempo, partidas.resultado, users.nombre, 
                                                  COUNT(partidasjugadores.id_jugador) AS 'jugadores' FROM partidas JOIN users ON partidas.anfitrion=users.id 
                                                  JOIN partidasjugadores ON partidas.id=partidasjugadores.id_partida WHERE partidas.estado = 'terminada'
                                                  GROUP BY partidasjugadores.id_partida;`, { type: QueryTypes.SELECT });
        return resultado;
    }
}

module.exports = ConexionPartida;