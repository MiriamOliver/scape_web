const { Router } = require('express');
const router = Router();
const controlador = require('../controllers/partidaController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

router.post('/crear/:anfitrion', controlador.crearPartida);

module.exports = router