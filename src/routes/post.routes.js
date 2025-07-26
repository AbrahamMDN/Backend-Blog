// Importación de express, Router y lógica del controlador desde carpeta controllers
const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const validateObjectId = require('../middleware/validateObjectId');

/* Rutas y acciones */
router.get('/', postController.getAllPost);  // endpoint = http://localhost:3000/posts/

router.get('/:id', validateObjectId('id'), postController.getPostById);  // endpoint = http://localhost:3000/posts/:id = http://localhost:3000/posts/1

// Nueva ruta
router.get('/user/:userId', postController.getPostByUserId);  // endpoint = http://localhost:3000/posts/user/:userId = http://localhost:3000/posts/user/1

// Nueva ruta 
router.get('/title/:title', postController.getPostByTitle); // endpoint = http://localhost:3000/posts/title/:title

router.post('/', postController.createPost); // endpoint = http://localhost:3000/posts/

router.put('/:id', validateObjectId('id'), postController.updatePost); // endpoint = http://localhost:3000/posts/:id = http://localhost:3000/posts/1

router.delete('/:id', postController.deletePost); // endpoint = http://localhost:3000/posts/:id = http://localhost:3000/posts/1

// Exportación router
module.exports = router;