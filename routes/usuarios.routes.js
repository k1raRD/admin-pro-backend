/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require("../middlewares/validar-campos.middleware");

const { getUsuarios, createUser, updateUsuario, deleteUsuario } = require('../controllers/usuarios.controller');
const { validatJWT, validarAdminRole, validarAdminRoleOUsuario } = require('../middlewares/validar-jwt');

const router = Router();

// Rutas
router.get('/', validatJWT , getUsuarios);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos,
] 
,createUser);

router.put('/:id', [
    validatJWT,
    validarAdminRoleOUsuario,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('role', 'El role es obligatorio').not().isEmpty(),
] , updateUsuario);

router.delete('/:id', validatJWT, deleteUsuario);

module.exports = router;