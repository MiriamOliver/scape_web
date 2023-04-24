const { Router } = require('express');
const router = Router();
const controlador = require('../controllers/partidaController')
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

router.post('/crear', controlador.crearPartida);

router.get('/sala/:id', controlador.mostrarJugadoresSala);

//router.post('/disponibles', controlador.crearPartida);

module.exports = router