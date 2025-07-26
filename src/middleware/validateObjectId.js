// Importación de mongoose 
const mongoose = require('mongoose');

// Definicipon de una función que valida el formato de id de un post con mongoose para extender su ejecución como un middleware
const validateObjectId = (paramName = 'id') => {
    // Recupera el id del input y lo almacena en una constante 
  return (req, res, next) => {
    const id = req.params[paramName];

    // Si no cumple con el formato válido, se imprime el error
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: `El parámetro '${paramName}' no es un ID válido` });
    }

    // Se da pie a que la ejecución continúa al controlador en curso
    next(); 
  };
};

// Exportación del middleware
module.exports = validateObjectId;