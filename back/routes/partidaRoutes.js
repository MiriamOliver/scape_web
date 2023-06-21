const { Router } = require('express');
const router = Router();
const controlador = require('../controllers/partidaController')
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const mid = require('../middlewares/user-middlewares');
const midPartida = require('../middlewares/partida-middlewares')

router.post('/crear', [mid.esAnfitrion], controlador.crearPartida);

router.post('/unirse', [mid.esJugadorPartida, midPartida.partidaRegistrada], controlador.unirseSala);

router.get('/sala/:id', [midPartida.existeSala], controlador.conseguirPartida);

router.get('/disponibles/:id', [midPartida.existeSala], controlador.partidasDisponibles);

router.get('/creadas/:id', [midPartida.existeSala], controlador.partidasCreadas);

router.get('/curso/:id', [midPartida.existeSala], controlador.partidasEnCurso);

router.get('/jugador/:id', [mid.esJugador, mid.usuarioExiste], controlador.partidasJugador);

router.put('/resultado/:id', [midPartida.existeSala], controlador.finalizarPartida);

router.get('/resultado/partida/:id', [midPartida.existeSala], controlador.getResultadoPartida);

router.get('/resultado/jugadores/:id', [midPartida.existeSala], controlador.getResultadoJugadorPartida);

router.get('/mostrar/:id', [midPartida.existeSala], controlador.mostrarPartida);

module.exports = router