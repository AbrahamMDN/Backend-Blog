// Así se utiliza la importación de forma actual para express
// Así no es en este caso: import express from "express";
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para leer JSON
app.use(express.json());

// Dato simulado
const post = [
    { id: 1, title: "primer post"},
    { id: 2, title: "segundo post"}
];

// Mi primer endpoint para traer post
app.get('/posts', (req, res) => {
    res.json(post)
});

// Mi segundo endpoint para guardar un nuevo post
app.post('/posts', (req, res) => {
    const nuevoPost = req.body;
    console.log('Nuevo post recibido: ', nuevoPost);
    post.push(nuevoPost);
    res.json({message: 'Post agregado correctamente', data: nuevoPost});
});

// Endpoint borrar el último post
// HAcee gitnit
app.delete('/posts', (req, res) => {
    const DelatedPost = post.pop();
    console.log('Post eliminado', DelatedPost);
    res.json({message: 'Último post eliminado correctamente'});
});


app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});