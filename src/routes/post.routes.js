// Importación de express, Router y lógica del controlador desde carpeta controllers
const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');

/* Rutas y acciones */
router.get('/', postController.getAllPost);  // endpoint = http://localhost:3000/posts/

router.get('/:id', postController.getPostById);  // endpoint = http://localhost:3000/posts/:id = http://localhost:3000/posts/1

// Nueva ruta 
router.get('/title/:title', postController.getPostByTitle); // endpoint = http://localhost:3000/posts/title/:title

router.post('/', postController.createPost); // endpoint = http://localhost:3000/posts/

router.put('/:id', postController.updatePost); // endpoint = http://localhost:3000/posts/:id = http://localhost:3000/posts/1

router.delete('/:id', postController.deletePost); // endpoint = http://localhost:3000/posts/:id = http://localhost:3000/posts/1

// Exportación router
module.exports = router;