const mongoose = require('mongoose');
require('dotenv').config();

const DB_CNN = process.env.DB_CNN;

const dbConnection = async () => {
    try {
        await mongoose.connect(DB_CNN);

        console.log('DB Online');
    } catch(error) {
        console.log(error);
        throw new Error("Error a la hora de iniciar la DB ver logs")
    }
}

module.exports = {dbConnection}