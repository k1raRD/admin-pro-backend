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

// Directorio publico
app.use(express.static('public'));

const PORT = process.env.PORT;

// Rutas
app.use('/api/usuarios', require('./routes/usuarios.routes'))
app.use('/api/hospitales', require('./routes/hospitales.routes'))
app.use('/api/medicos', require('./routes/medicos.routes'))
app.use('/api/todo', require('./routes/busquedas.routes'))
app.use('/api/uploads', require('./routes/uploads.routes'))
app.use('/api/login', require('./routes/auth.routes'))

app.listen( PORT, () => {
    console.log("Servidor corriendo: " + PORT);
});