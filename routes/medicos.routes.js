/**
 *  Path: /api/medicos
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require("../middlewares/validar-campos.middleware");

const { validatJWT } = require('../middlewares/validar-jwt');
const { getMedicos, createMedico, upadateMedico, deleteMedico } = require('../controllers/medicos.contoller');


const router = Router();

// Rutas
router.get('/', [] ,getMedicos);

router.post('/', [
    validatJWT,
    check('nombre', 'El nombre del medico es requerido').not().isEmpty(),
    check('hospital', 'El hospital id debe de ser valido').isMongoId(),
    validarCampos
] 
,createMedico);

router.put('/:id', [
] , upadateMedico);

router.delete('/:id', [], deleteMedico);

module.exports = router;