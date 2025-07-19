// Definición del puerto y llamado a la lógica del servidor desde app.js
const app = require('./src/app')
const PORT = 3000

// Se inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});