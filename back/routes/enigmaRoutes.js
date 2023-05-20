const { Router } = require('express');
const router = Router();
const controlador = require('../controllers/enigmaController')
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


router.get('/mostrar/creados/:id', controlador.mostrarEnigmasCreados);

router.get('/mostrar/:id', controlador.mostrarEnigma);

module.exports = router