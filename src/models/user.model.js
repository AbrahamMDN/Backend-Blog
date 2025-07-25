// Importación de Mongoose
const mongoose = require('mongoose');

// Se define la estructura de mi usuario a través de mongoose
const userSchema = new mongoose.Schema({
    // Agrego parámetros required y unique a email para aumentar robustez en el registro
    email: {
        type: String,
        required: true,
        unique: true // Evita duplicados a nivel BD
    },
    password: String,
    created_at: { type: Date, default: Date.now } 
});

// Exportación del modelo para usuario. Se interpreta como User por otros desarrollos
module.exports = mongoose.model('User', userSchema);