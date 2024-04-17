const { request, response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario.model');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req = request, res = response) => {

    const { email, password } = req.body;

    try {

        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "Email o password incorrectos."
            })
        }

        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Email o password incorrectos."
            })
        }

        const token = await generarJWT(usuarioDB.id);

        res.json({ ok: true, token })
    } catch (error) {
        console.log(errro);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const googleSignIn = async (req = request, res = response) => {

    const googleToken = req.body.token;

    try {

        const { name, email, picture } = await googleVerify(googleToken);

        const usuarioDB = await Usuario.findOne({email});
        let usuario;

        if(!usuarioDB) {
            Usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            })
        } else {
            usuario = usuarioDB;
            usuario.google = true;
        }

        await usuario.save();

        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token
        })

    } catch (error) {
        res.status(401).json({
            ok: false,
            mgs: 'El token no es correcto.'
        })
    }
}

const renewToken = async (req = request, res = response) => {

    const uid = req.uid;

    const token = await generarJWT(uid);

    res.json({
        ok: true,
        uid,
        token
    });
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}