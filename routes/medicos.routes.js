/**
 *  Path: /api/medicos
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require("../middlewares/validar-campos.middleware");

const { validatJWT } = require('../middlewares/validar-jwt');
const { getMedicos, getMedico,createMedico, upadateMedico, deleteMedico } = require('../controllers/medicos.contoller');


const router = Router();

// Rutas
router.get('/', [validatJWT] ,getMedicos);

router.get('/:id', [
    validatJWT
], getMedico);

router.post('/', [
    validatJWT,
    check('nombre', 'El nombre del medico es requerido').not().isEmpty(),
    check('hospital', 'El hospital id debe de ser valido').isMongoId(),
    validarCampos
] 
,createMedico);

router.put('/:id', [
    validatJWT,
    check('nombre', 'El nombre del medico es requerido').not().isEmpty(),
    check('hospital', 'El hospital id debe de ser valido').isMongoId(),
    validarCampos
] , upadateMedico);

router.delete('/:id', [
    validatJWT
], deleteMedico);

module.exports = router;