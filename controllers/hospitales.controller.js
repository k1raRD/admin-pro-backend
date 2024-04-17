const { request, response } = require('express');
const Hospital = require('../models/hospital.model')

const getHospitales = async (req = request, res = response) => {

    const hospitales = await Hospital.find()
                            .populate('usuario', 'nombre img');

    res.json({
        ok: true,
        msg: hospitales
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

const upadateHospital = (req = request, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarHospital'
    })
}

const deleteHospital = (req = request, res = response) => {
    res.json({
        ok: true,
        msg: 'deleteHospital'
    })
}

module.exports = {
    getHospitales,
    createHospital,
    upadateHospital,
    deleteHospital
}