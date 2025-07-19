// Un controlador decide que hacer. Es la parte lógica.
// Let permite un mayor alcance de una variable, pero de forma controlada

// Importación de modelo base
let posts = require('../models/post.model');

/* Definición de controles-acciones */

// Obtener todos los post (GET)
exports.getAllPost = (req, res) => {
    res.json(posts)
};

// Cuando se trabaja con BD, es el controller el que se conecta con ella

// Obtener post por id (GET)
exports.getPostById = (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);
    if (!post) return res.status(404).json({error: 'Post no encontrado'});
    res.json(post);
}; 

// Cada que haga un cambio en mi código, debo cerrar mi servidor y volverlo a correr (npm run start)

// Crear post
exports.createPost = (req, res) => {
    const newPost = {
        id: Date.now(),
        title: req.body.title,
        content: req.body.content
    };
    posts.push(newPost);

    return res.status(201).json(newPost); 
};

// Actualiza datos de posts por id
exports.updatePost = (req, res) => {
    const id = parseInt(req.params.id);
    const index = posts.findIndex(p => p.id === id);
    if (index === -1) return res.status(404).json({error: 'Post no encontrado'});

    posts[index] = {
        ...posts[index], 
        title: req.body.title,
        content: req.body.content
    };

    return res.json(posts[index]); 
};

// Elimina un post por id
exports.deletePost = (req, res) => {
    const id = parseInt(req.params.id);
    const inicial = posts.length;
    posts = posts.filter(p => p.id !== id)
    if (posts.length === inicial) return res.status(404).json({error: 'Post no encontrado'});

    // Actualiza el modulo donde esta nuestro arreglo de post: post.model
    // Divide mi arreglo en 2: la sección que quiero eliminar y la sección a conservar actualizada
    require('../models/post.model').splice(0, require('../models/post.model').length, ... posts);

    return res.status(204).end();
};


/* Tarea: Método crear posts con id numérico, incluyendo impresión de errores por id existentes */

// Opción 1) El usuario proporciona el id manualmente (no es autoajustable)

/*
exports.createPost = (req, res) => {
    // Estructura del post
    const { id, title, content } = req.body;

    // Validar que el ID sea un número
    if (typeof id !== 'number') {
        return res.status(400).json({ error: "El ID debe ser un número." });
    }

    // Verificar si el ID ya existe
    const idExistente = posts.some(post => post.id === id);

    if (idExistente) {
        return res.status(400).json({ error: `Ya existe un post con el ID ${id}` });
    }

    // Creación del nuevo post y adición al arreglo
    const newPost = { id, title, content };
    posts.push(newPost);

    return res.status(201).json(newPost);
};
*/

// Opción 2) El sistema proporciona un id incremental autoajustable

/*
// Contador inicial de id
let currentId = 1;

exports.createPost = (req, res) => {
    // Inputs del post
    const { title, content } = req.body;

    // Validación de datos requeridos
    if (!title || !content) {
        return res.status(400).json({ error: "Título y contenido son obligatorios." });
    }

    // Verifica si el ID ya existe antes de usarlo
    if (posts.some(post => post.id === currentId)) {
        return res.status(400).json({ error: `Ya existe un post con el ID ${currentId}` });
    }

    // Creación del nuevo post (con el id incremental) y adición al arreglo
    const newPost = {
        id: currentId++,
        title,
        content
    };

    posts.push(newPost);
    return res.status(201).json(newPost);
};
*/
