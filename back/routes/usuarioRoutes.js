const { Router } = require('express');
const router = Router();
const controlador = require('../controllers/userController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

router.get('/conectados/:rol/:id', controlador.getUsuariosConectados);

router.get('/mostrar/:id', controlador.mostrarUsuario);

router.put('/actualizar', controlador.actualizarUsuario);

router.post('/crear', controlador.crearUsuario);

router.post('/generar', controlador.generarUsuarios);

router.post('/foro/archivo', controlador.archivoForo);

router.put('/modificar/perfil', controlador.modificarPerfil);

router.put('/modificar/passwd', controlador.modificarPasswd);

router.put('/modificar/habilitar', controlador.modificarHabilitar);

module.exports = router