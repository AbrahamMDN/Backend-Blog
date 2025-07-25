// Importación de modelo base para un usuario autorizado
const User = require('../models/user.model')

// Método para registro de usuario y sus credenciales (con validación de correo existente)
exports.register = async (req,res) => {
    try{
        const { email } = req.body;
        // Se verifica si ya existe un usuario registrado con ese correo
        const existUser = await User.findOne({ email });

        // Si existe, se imprime el mensaje que lo señala
        if (existUser) {
            return res.status(400).json({ message: "Este correo ya está registrado por otro usuario" });
        };

        // Si no existe, se crea y se guarda el nuevo usuario
        const user = new User(req.body);
        // Se guarda en la BD
        await user.save();
        return res.status(201).json(user);
    } catch (error) {
        // Si falla el intento, se imprime el error en consola y se indica que hubo un error en el servidor
        console.error("Error al registrar usuario:", error);
        return res.status(500).json({ message: "Error del servidor." });
    }   
};

// Método para inicio de sesión con credenciales del usuario
exports.login = async (req,res) => {
    // findOne busca al usuario por sus credenciales únicas
    const user = await User.findOne({ email: req.body.email, password: req.body.password })
    if (user) return res.json(user)
    return res.status(404).json({message: 'Credenciales Inválidas'})
};

/*

Método para registro de usuario y sus credenciales (sin validación de correo existente)

exports.register = async (req,res) => {
    const user = new User(req.body);
    // Se guarda en la BD
    await user.save();
    return res.status(201).json(user)
};

*/