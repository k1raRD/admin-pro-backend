const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model');

const validatJWT = (req = request, res = response, next) => {

    const reqToken = req.header('Authorization');

    if (!reqToken) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    const token = reqToken.slice(7);

    try {

        const {uid} = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = uid;
        next();
    } catch(err) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }
}

const validarAdminRole = async (req = request, res = response, next) => {

    const uid = req.uid

    try {

        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe.'
            })
        }

        if(usuarioDB.role !== 'ADMIN_ROLES') {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para hacer esto.'
            })
        }

        next();
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error, contacte con el admin.'
        })
    }

}

const validarAdminRoleOUsuario = async (req = request, res = response, next) => {

    const uid = req.uid
    const id  = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe.'
            })
        }

        if(usuarioDB.role === 'ADMIN_ROLE' || uid === id) {
            next();
        } else {
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para hacer esto.'
            })
        }

        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error, contacte con el admin.'
        })
    }

}

module.exports = {
    validatJWT,
    validarAdminRole,
    validarAdminRoleOUsuario
} 