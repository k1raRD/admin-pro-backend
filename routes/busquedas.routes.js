/*
    Path: api/todo/:busqueda
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require("../middlewares/validar-campos.middleware");

const { getBusqueda, getCollecion } = require('../controllers/busqueda.controller');
const { validatJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get("/:busqueda", [validatJWT], getBusqueda)
router.get("/colleccion/:tabla/:busqueda", [validatJWT], getCollecion)

module.exports = router