const { request, response } = require('express');

const Usuario = require('../models/usuario.model');
const Hospital = require('../models/hospital.model');
const Medico = require('../models/medico.model')

const getBusqueda = async (req = request, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex })
    ]);


    res.status(200).json({
        ok: true,
        usuarios,
        medicos,
        hospitales
    })
}

const getCollecion = async (req = request, res = response) => {

    const busqueda = req.params.busqueda;
    const tabla = req.params.tabla;
    const regex = new RegExp(busqueda, 'i');
    let data = [];

    switch (tabla) {
        case 'medicos':
            data = await Medico.find({nombre: regex}, 'nombre img id')
                                .populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre img');
            break;

        case 'hospitales':
            data = await Hospital.find({nombre: regex})
                                 .populate('usuario', 'nombre img');
            break;

        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios, medicos y hospitales.'
            });
    }

    res.status(200).json({
        ok: true,
        resultados: data
    })
}


module.exports = { getBusqueda, getCollecion }