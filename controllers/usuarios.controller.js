const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario.model');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res) => {
    const usuarios = await Usuario.find({}, 'nombre email role google');
    res.status(200).json({
        ok: true,
        usuarios: usuarios,
        uid: req.uid
    })
}

const createUser = async (req = request, res = response) => {
    const { email, password, nombre } = req.body;
    try {
        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: "El correo ya existe."
            })
        }
        const usuario = new Usuario(req.body);
        // Encriptar Password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        const usuarioSaved = await usuario.save();

        const token = await generarJWT(usuarioSaved.id);

        res.json({
            ok: true,
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs.'
        })
    }
}

const updateUsuario = async (req, res = response) => {

    // TODO: Validar token y comprobar si es el usuario correcto

    const uuid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uuid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            })
        }

        const { password, google, email, ...campos } = req.body;

        if (usuarioDB.email != email) {

            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email.'
                })
            }
        }

        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uuid, campos, { new: true });

        res.json({
            ok: true,
            usuario: usuarioActualizado
        })
    } catch (error) {
        res.status(200).json({ ok: false, msg: "Something bad happend." })
    }
}

const deleteUsuario = async(req, res) => {
    const uuid = req.params.id;

    try {

        const existeUsuario = await Usuario.findOne({ _id: uuid });

        if(!existeUsuario) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            })
        }

        await Usuario.findByIdAndDelete(uuid);

        res.status(200).json({
            ok: true,
            uuid,
            msg: 'Usuario eliminado con exito.'
        })

    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
} 

module.exports = {
    getUsuarios,
    createUser,
    updateUsuario,
    deleteUsuario
}