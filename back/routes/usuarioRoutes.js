const { Router } = require('express');
const router = Router();
const controlador = require('../controllers/userController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

router.get('/conectados/:rol/:id', controlador.getUsuariosConectados);

router.get('/mostrar/:id', controlador.mostrarUsuario);

router.put('/actualizar', controlador.actualizarUsuario);

module.exports = router