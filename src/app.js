// Importación de express
const express = require('express');
// Importación de cors: Permite que se ejecuten otras aplicaciones en el servidor y se implementen middlewares
const cors = require('cors');
// Importación de conexión con base de datos
const connectDB = require('./config/db')
// Importación de lógica de rutas desde carpeta routes
const postRoutes = require('./routes/post.routes');
const userRoutes = require('./routes/auth.routes');

// Uso de Express
const app = express();
// Se ejecuta la conexión con la BD en la nube
connectDB();

// Middlewares
app.use(cors()); // Permite que otros desarrollos se comuniquen con este servidor
app.use(express.json()); // Uso de JSONS

/* Registro de rutas */ 
app.use('/posts', postRoutes); // Rutas para publicaciones:  http://localhost:3000/posts

app.use('/user', userRoutes); // Rutas para publicaciones:  http://localhost:3000/user

// Exportación app
module.exports = app;