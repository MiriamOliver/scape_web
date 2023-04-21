const { Router } = require('express');
const router = Router();
const controlador = require('../controllers/userController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

router.get('/conectados/:rol/:id', controlador.getUsuariosConectados);

module.exports = router