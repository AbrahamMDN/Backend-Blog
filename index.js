// Me configura que toda mi aplicación con mis variables de entorno
require('dotenv').config();
// Definición del puerto de conexión con la BD y llamado a la lógica del servidor desde app.js
const app = require('./src/app');
const PORT = process.env.PORT;

// Se inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});