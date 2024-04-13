const express = require('express');
const { dbConnection } = require('./databases/config')
const cors = require('cors')
require('dotenv').config();

// Crear el servidor de express
const app = express();

// Configurar CORS
app.use(cors());

// Base de datos
dbConnection();

const PORT = process.env.PORT;

// Rutas
app.get('/', (req, res) => {

    res.status(400).json({
        ok: true,
        mensaje: "Hola Mundo"
    })

});

app.listen( PORT, () => {
    console.log("Servidor corriendo: " + PORT);
});