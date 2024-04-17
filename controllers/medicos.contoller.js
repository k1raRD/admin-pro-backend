const {request, response} = require('express');
const Medico = require('../models/medico.model');
const Hospital = require('../models/hospital.model')

const getMedicos = async (req = request, res = response) => {

    try {

        const medicos = await Medico.find({}, 'nombre')
                                        .populate('usuario', 'nombre img')
                                        .populate('hospital', 'nombre img');

        res.status(200).json({
            ok: true,
            medicos
        })   
    } catch(error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error, contacte con el admin.'
        })  
    }
}

const createMedico = async (req = request, res = response) => {

    const uidUsuario = req.uid;
    const hospital = await Hospital.findOne({usuario: uidUsuario});

    const medico = new Medico({
        usuario: uidUsuario,
        ...req.body,
        hospital: hospital.id
    });

    try {

        const nuevoMedico = await medico.save();

        res.json({
            ok: true,
            medico: nuevoMedico
        })

    } catch(error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Hubo un error, comuniquese con el administrador'
        })
    }

}

const upadateMedico = (req = request, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarMedico'
    })
}

const deleteMedico = (req = request, res = response) => {
    res.json({
        ok: true,
        msg: 'deleteMedico'
    })
}

module.exports = {
    getMedicos,
    createMedico, 
    upadateMedico, 
    deleteMedico
}