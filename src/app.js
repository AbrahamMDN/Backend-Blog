// Importación de express y lógica de rutas desde carpeta routes
const express = require('express');
const postRoutes = require('./routes/post.routes');

// Uso de express y middleware
const app = express();
app.use(express.json());

// Registro de rutas 
app.use('/posts', postRoutes); // Rutas para publicaciones:  http://localhost:3000/posts

// Exportación app
module.exports = app;