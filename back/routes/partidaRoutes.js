const { Router } = require('express');
const router = Router();
const controlador = require('../controllers/partidaController')
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

router.post('/crear', controlador.crearPartida);

router.get('/sala/:id', controlador.mostrarJugadoresSala);

router.get('/disponibles/:id', controlador.partidasDisponibles);

router.get('/creadas/:id', controlador.partidasCreadas);

router.get('/curso/:id', controlador.partidasEnCurso);

module.exports = router