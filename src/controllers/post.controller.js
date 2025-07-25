// Importación de modelo base para un post
const Post = require('../models/post.model');

/* Definición de controles-acciones */
// Se adaptan como asíncronos para que sean adecuados para la conexión con la BD en la nube

// Obtener todos los post (GET)
exports.getAllPost = async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts)
    } catch (error) {
        res.status(500).json({message: 'Error al obtener todos los posts', error: error.message});
    }
};

// Cuando se trabaja con BD, es el controller el que se conecta con ella

// Obtener post por id (GET)
exports.getPostById = async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if (post) return res.json(post)
        return res.status(401).json({message: 'Post no encontrado'})
    } catch (error) {
        return res.status(500).json({message: 'Error al encontrar el post', error: error.message})
    }    
}; 
// Tarea con findOne para tarer un post por su titulo. Hacer el Endpoint



// Cada que haga un cambio en mi código, debo cerrar mi servidor y volverlo a correr (npm run start). Si utilizo nodemon, ya no es necesario cerrar y cargar el servidor después de cada cambio

// Crear post
/* Puedo agregar el user id por FrontEnd al agregar el campo user_id en el body del input (siendo el mismo id que se me proporciona al logearme) */
exports.createPost = async (req, res) => {
    const post =  new Post(req.body);
    await post.save();
    return res.status(201).json(post); 
    // Que no se repita el mismo post
};

// Hacer estos dos más robustos
 // Implementar mensaje de error que no se pudo actualizar y que no se pudo eliminar si no existe id
 // No se puede actualizar el post porque no existe

// Actualiza datos de posts por id
exports.updatePost = async (req, res) => {
    // Se añade un parámetro new para indicar que es una actualización
    const updated = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true});
    return res.json(updated);
};

// Elimina un post por id
exports.deletePost = async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    return res.status(204).end();
};


