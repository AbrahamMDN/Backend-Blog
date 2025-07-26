// Importación de Mongoose
const mongoose = require('mongoose');

// Se define la estructura de un post a través de mongoose
const postSchema = new mongoose.Schema({
    // Agrego parámetros required y unique a title y content para aumentar robustez en el posteo
    title: { 
        type: String, 
        required: true, 
        unique: true 
    },
    content: { 
        type: String, 
        required: 
        true 
    },
    // Se define el user_id a través de mi modelo de usuario
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    created_at: { type: Date, default: Date.now }
});

// // Exportación del modelo para post. Se interpreta como Post por otros desarrollos
module.exports = mongoose.model('Post', postSchema);