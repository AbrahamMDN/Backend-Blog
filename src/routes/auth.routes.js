// // Importación de express, Router y lógica del controlador desde carpeta controllers
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

/* Rutas y acciones */
router.post('/register', authController.register); // endpoint: http://localhost:3000/user/register
router.post('/login', authController.login); // endpoint: http://localhost:3000/user/login

// Exportación router
module.exports = router;