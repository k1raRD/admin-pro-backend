/*
    Path: api/uploads/:tipo/:id
*/
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');

const { fileUpload, getImage } = require('../controllers/uploads.controller');
const { validatJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.use(expressFileUpload());

router.post("/:tipo/:id", [validatJWT], fileUpload)
router.get("/:tipo/:foto", getImage)

module.exports = router;