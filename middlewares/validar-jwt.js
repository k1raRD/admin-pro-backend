const { request, response } = require('express');
const jwt = require('jsonwebtoken');

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

module.exports = {
    validatJWT
}