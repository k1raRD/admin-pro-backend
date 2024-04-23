/* 
    Path: '/api/login'
*/
const {Router} = require('express');
const { login, googleSignIn, renewToken } = require('../controllers/auth.controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos.middleware');
const { validatJWT } = require('../middlewares/validar-jwt');

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

router.get('/renew',
[
    validatJWT
],
renewToken
)

module.exports = router;