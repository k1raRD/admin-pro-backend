/* 
    Path: '/api/login'
*/
const {Router} = require('express');
const { login, googleSignIn } = require('../controllers/auth.controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos.middleware');

const router = Router();

router.post('/',
[
    check('email', 'El campo email es obligatorio').isEmail(),
    check('password', 'El campo password es obligatorio').not().isEmpty(),
    validarCampos
],
login
)

router.post('/google',
[
    check('token', 'El token de google es obligatorio').not().isEmpty(),
    validarCampos
],
googleSignIn
)

module.exports = router;