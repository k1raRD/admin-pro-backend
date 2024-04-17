const { request, response } = require('express');
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
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error, contacte con el admin.'
        })
    }
}

const createMedico = async (req = request, res = response) => {

    const uidUsuario = req.uid;
    const hospital = await Hospital.findOne({ usuario: uidUsuario });

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

    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Hubo un error, comuniquese con el administrador'
        })
    }

}

const upadateMedico = async (req = request, res = response) => {

    const medicoId = req.params.id;
    const uid = req.uid;

    try {

        const medico = await Medico.findById(medicoId);

        if (!medico) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontro nada por el id del medico',
            })
        }

        const cambiosMedico = {
            ...req.body,
            usario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(medicoId, cambiosMedico, { new: true });

        res.json({
            ok: true,
            medico: medicoActualizado
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const deleteMedico = async (req = request, res = response) => {

    const medicoId = req.params.id;

    try {

        const medico = await Medico.findById(medicoId);

        if (!medico) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontro nada por el id del medico',
            })
        }

        await Medico.findByIdAndDelete(medicoId);

        res.json({
            ok: true,
            mag: 'Medico eliminado'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    getMedicos,
    createMedico,
    upadateMedico,
    deleteMedico
}