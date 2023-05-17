const { Router } = require('express');
const router = Router();
const controlador = require('../controllers/partidaController')
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

router.post('/crear', controlador.crearPartida);

router.post('/unirse', controlador.unirseSala);

router.get('/sala/:id', controlador.conseguirPartida);

router.get('/disponibles/:id', controlador.partidasDisponibles);

router.get('/creadas/:id', controlador.partidasCreadas);

router.get('/curso/:id', controlador.partidasEnCurso);

router.put('/resultado/:id', controlador.finalizarPartida);

router.get('/resultado/partida/:id', controlador.getResultadoPartida);

router.get('/resultado/jugadores/:id', controlador.getResultadoJugadorPartida);

module.exports = router