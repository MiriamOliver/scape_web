const { Router } = require('express');
const router = Router();
const controlador = require('../controllers/userController');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const mid = require('../middlewares/user-middlewares')

router.get('/conectados/:rol/:id', [mid.usuarioExiste], controlador.getUsuariosConectados);

router.get('/mostrar/:id', [mid.usuarioExiste], controlador.mostrarUsuario);

router.put('/actualizar',  [mid.usuarioRegistrado], controlador.actualizarUsuario);

router.post('/crear', controlador.crearUsuario);

router.post('/generar', controlador.generarUsuarios);

router.post('/foro/archivo', controlador.archivoForo);

router.put('/modificar/perfil', [mid.usuarioRegistrado], controlador.modificarPerfil);

router.put('/modificar/passwd', [mid.usuarioRegistrado], controlador.modificarPasswd);

router.put('/modificar/habilitar', [mid.usuarioRegistrado], controlador.modificarHabilitar);

module.exports = router