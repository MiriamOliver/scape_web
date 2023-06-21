const { Router } = require('express');
const router = Router();
const controlador = require('../controllers/enigmaController')
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const mid = require('../middlewares/user-middlewares');


router.get('/mostrar/creados/:id',[mid.esAdmin, mid.usuarioExiste], controlador.mostrarEnigmasCreados);

router.get('/mostrar/:id',[mid.esAdmin, mid.usuarioExiste], controlador.mostrarEnigma);

module.exports = router