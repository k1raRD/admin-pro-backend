/**
 *  Path: /api/hospitales
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require("../middlewares/validar-campos.middleware");

const { validatJWT } = require('../middlewares/validar-jwt');
const { getHospitales, createHospital, upadateHospital, deleteHospital } = require('../controllers/hospitales.controller');

const router = Router();

// Rutas
router.get('/', [validatJWT] ,getHospitales);

router.post('/', [
    validatJWT,
    check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
    validarCampos
] 
,createHospital);

router.put('/:id', [
    validatJWT,
    check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
    validarCampos
] , upadateHospital);

router.delete('/:id', [
    validatJWT
], deleteHospital);

module.exports = router;