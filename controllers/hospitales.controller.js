const { request, response } = require('express');
const Hospital = require('../models/hospital.model')

const getHospitales = async (req = request, res = response) => {

    const hospitales = await Hospital.find()
                            .populate('usuario', 'nombre img');

    res.json({
        ok: true,
        hospitales
    })
}

const createHospital = async (req = request, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {

        const hospitalSaved = await hospital.save(); 

        res.json({
            ok: true,
            msg: hospitalSaved
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            hospital: hospitalSaved
        })
    }
}

const upadateHospital = async (req = request, res = response) => {

    const hospitalId = req.params.id;
    const uid = req.uid;

    try {

        const hospital = await Hospital.findById(hospitalId);

        if(!hospital) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontro nada por el id del hospital',
            })
        }

        const cambiosHospital = {
            ...req.body,
            usario: uid
        }
        
        const hospitalActualizado = await Hospital.findByIdAndUpdate(hospitalId, cambiosHospital, {new: true});

        res.json({
            ok: true,
            msg: 'actualizarHospital',
            hospital: hospitalActualizado
        })
    } catch(error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const deleteHospital = async (req = request, res = response) => {
    const hospitalId = req.params.id;

    try {

        const hospital = await Hospital.findById(hospitalId);

        if(!hospital) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontro nada por el id del hospital',
            })
        }

        await Hospital.findByIdAndDelete(hospitalId)

        res.json({
            ok: true,
            msg: 'Hospital eliminado'
        })
    } catch(error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    getHospitales,
    createHospital,
    upadateHospital,
    deleteHospital
}