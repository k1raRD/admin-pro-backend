const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario.model');
const { generarJWT } = require('../helpers/jwt');

const login = async (req, res = response ) => {

    const { email, password} = req.body;

    try {

        // Verificar Email
        const usuarioDB = await Usuario.findOne({email});

        if(!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "Email o password incorrectos."
            })
        }

        // Verificar password
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if(!validPassword) { 
            return res.status(400).json({
                ok: false,
                msg: "Email o password incorrectos."
            })
        }

        const token = await generarJWT(usuarioDB.id);

        res.json({ok: true, token})
    } catch(error) {
        console.log(errro);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    login
}