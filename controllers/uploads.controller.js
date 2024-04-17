const path = require('path');
const fs = require('fs');

const {request, response} = require('express')
const uuid = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');

const fileUpload = (req = request, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    // Validar tipo
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
    if( !tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es un medico, usuario u hospital'
        })
    }

    if(!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo.'
        });
    }

    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length -1];

    // Validar extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if(!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extension valida.'
        });
    }

    const nombreArchivo = `${nombreCortado[0]}${uuid.v4()}.${extensionArchivo}`;

    // Path guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    // Mover la imagen
    file.mv(path, (err) => {
        if(err) {
            console.error(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover el archivo'
            });
        }

        // Actualizar base de datos.
        actualizarImagen(tipo, id, nombreArchivo);

        return res.json({
            ok: true,
            msg: "Archivo subido",
            nombreArchivo
        })
    })
}

const getImage = (req = request, res = response) => {
    
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    let pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    if(!fs.existsSync(pathImg)) {
        pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
    }

    res.sendFile(pathImg);
}

module.exports = {fileUpload, getImage}