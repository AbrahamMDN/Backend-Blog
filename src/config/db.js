// Importación de Mongoose
const mongoose = require('mongoose');

// Se crea una conexión asíncrona con la BD almacenada en la nube
const connectDB = async () => {
    // Se espera la conexión a través de la URI proporcionada
    try{
        // env es environment
        await mongoose.connect(process.env.MONGO_URI);
        // Se informa en consola que la conexión fue exitosa
        console.log('MongoDB conectado');
    } catch(error) {
        // Si existe un error en la conexión, se informa en la consola, se imprime el error y se cierra el proceso de conexión
        console.error('Error al conectar con MongoDB: ', error.message);
        process.exit(1);
    }
};

// Exportación del modulo de conexión
module.exports = connectDB