// Importación de modelo base para un post y mongoose
const Post = require('../models/post.model');
const mongoose = require('mongoose');

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

// Método con findOne para traer un post único por su título
// Obtener post por título (GET)
exports.getPostByTitle = async (req, res) => {
  try {
    const { title } = req.params;

    // Encuentra el post único que posee el título solicitado
    const post = await Post.findOne({ title });

    // Si existe, lo devuelve
    if (post) {
      return res.json(post);
    }

    // Si no existe, se imprime el mensaje que lo señala
    return res.status(404).json({ message: 'Post no encontrado por título' });

    // Si falla el intento, se imprime el error en consola y se indica que hubo un error en la búsqueda
  } catch (error) {
    return res.status(500).json({
      message: 'Error al buscar el post por título',
      error: error.message,
    });
  }
};

// Obtener post por id de usuario (GET)
// Método con find para traer todos los post de un usuario por su user id. Implementación de mensajes para errores de recuperación por ejecución o por no existencia de posts. Se implementa también una validación previa del formato de user id para evitar errores innecesarios en la solicitud a MongoDB 
exports.getPostByUserId = async (req, res) => {
    // Se recupera el id de usuario del input
    const { userId } = req.params;
    
    // Se valida que el id tenga el formato correcto
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "ID de usuario inválido" });
    }
    
    // Se intenta buscar los posts asociados al usuario
    try {
      // Se ordenan los resultados por fecha de creación
      const posts = await Post.find({ user_id: userId }).sort({ createdAt: -1 });
      
      // Si no se encuentran posts, se muestra en un mensaje
      if (!posts || posts.length === 0) {
        return res.status(404).json({ message: "No se encontraron posts para este usuario" });
      }
      
      // Si se encuentran posts, se devuelven ordenados por fecha de creación
      return res.json(posts);
    
      // Si falla el intento, se imprime el error en consola y se indica que hubo un error en la recuperación de posts
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener los posts del usuario", error: error.message,
        });
    }
};

// Cada que haga un cambio en mi código, debo cerrar mi servidor y volverlo a correr (npm run start). Si utilizo nodemon, ya no es necesario cerrar y cargar el servidor después de cada cambio

// Crear post
/* Puedo agregar el user id por FrontEnd al agregar el campo user_id en el body del input (siendo el mismo id que se me proporciona al logearme) */
// Mejora de la robustez del código al no permitir que existan posts duplicados (mismo título y contenido)
exports.createPost = async (req, res) => {
    try {
      const { title, content } = req.body;

      // Se verifica si ya existe un post con el mismo título y contenido
      const existPost = await Post.findOne({ title, content });

      // Si existe, se imprime el mensaje que lo señala
      if (existPost) {
        return res.status(400).json({ message: "Ya existe un post con ese título." });
      }

      // Si no existe, lo crea y guarda en la BD
      const post = new Post({ title, content });
      await post.save();

      return res.status(201).json(post);

      // Si falla el intento, se imprime el error en consola y se indica que hubo un error en el posteo
    } catch (error) {
        return res.status(500).json({ message: "Error al crear el post", error: error.message });
    }
};

// Actualiza datos de posts por id
// Mejora de la robustez del código al implementar mensajes para errores de actualización por ejecución o por no existencia del post. Se implementa también una validación para no generar un título duplicado con el de otro post ya existente al actualizar
exports.updatePost = async (req, res) => {
    try {
      // Se obtiene el título del input
      const { title } = req.body;
      // Se recupera el id del input
      const postId = req.params.id;

      // Se verifica si ya existe otro post con el mismo título y diferente ID
      if (title) {
        // Busca un post con el mismo título, pero que no sea el que se está actualizando ($ne = "not equal").
        const existPost = await Post.findOne({ title, _id: { $ne: postId } });if (existPost) {
            return res.status(400).json({ message: "Ya existe otro post con ese título." });
        }
      }

      // Si no existe otro post con el mismo título, se busca el post a editar y se actualizan los parámetros deseados
      // Se añade un parámetro new para indicar que es una actualización
      const updated = await Post.findByIdAndUpdate(postId, req.body, {
        new: true, // Devuelve el post actualizado
        runValidators: true, // Aplica validaciones del modelo si existen
      });

      // Si no encuentra el post (no existe), lo señala en un mensaje
      if (!updated) {
        return res.status(404).json({ message: "Post no encontrado. No se pudo actualizar." });
      }

      // Si lo encuentra, lo devuelve ya actualizado
      return res.json(updated);

      // Si falla el intento, se imprime el error en consola y se indica que hubo un error en la actualización
    } catch (error) {
        return res.status(500).json({
            message: "Error al intentar actualizar el post.", error: error.message,
        });
    }
};

// Elimina un post por id
// Mejora de la robustez del código al implementar mensajes para errores de eliminación por ejecución o por no existencia del post. Se implementa también una validación previa del formato de id para evitar errores innecesarios en la solicitud a MongoDB 
exports.deletePost = async (req, res) => {
    // Se recupera el id del input
    const { id } = req.params;
    
    // Se validar que el id tenga formato válido de ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID inválido. No se pudo procesar la solicitud." });
    }
    
    // Se intenta buscar el post por su id y se intenta eliminar
    try {
      const deleted = await Post.findByIdAndDelete(id);
      // Si no encuentra el post (no existe), lo señala en un mensaje
      if (!deleted) {
        return res.status(404).json({ message: "Post no encontrado. No se pudo eliminar." });
      }

      // Si lo encuentra, lo elimina y no devuelve un mensaje
      return res.status(204).end();

      // Si falla el intento, se imprime el error en consola y se indica que hubo un error en la eliminación
    } catch (error) {
        return res.status(500).json({
            message: "Error al intentar eliminar el post.", error: error.message,
        });
    }
};

/*

Método para actualización de un post por su id (sin implementación de try / catch)

exports.updatePost = async (req, res) => {
    // Se añade un parámetro new para indicar que es una actualización
    const updated = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true});
    return res.json(updated);
};

*/

/*

Método para eliminación de un post por su id (sin implementación de try / catch)

exports.deletePost = async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    return res.status(204).end();
};

*/