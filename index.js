const express = require('express');
const { dbConnection } = require('./databases/config')
const cors = require('cors')
require('dotenv').config();

// Crear el servidor de express
const app = express();

// Configurar CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json())

// Base de datos
dbConnection();

const PORT = process.env.PORT;

// Rutas
app.use('/api/usuarios', require('./routes/usuarios.routes'))
app.use('/api/login', require('./routes/auth.routes'))

app.listen( PORT, () => {
    console.log("Servidor corriendo: " + PORT);
});