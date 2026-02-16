import User from './user.model.js';
import bcrypt from 'bcryptjs';

// Crear un usuario
export const createUser = async (req, res, next) => {
    try {
        const { username, email, password, name } = req.body;

        // Validación básica
        if (!username || !email || !password || !name) {
            return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
        }

        // Revisar si ya existe usuario con ese username o email
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ msg: 'El usuario o email ya existe' });
        }

        // Hashear contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear usuario
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            name
        });

        await newUser.save();

        // Retornar usuario creado (sin contraseña)
        const userToReturn = {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            name: newUser.name
        };

        return res.status(201).json(userToReturn);
    } catch (err) {
        next(err); // Pasar error al middleware de manejo de errores
    }
};

// Obtener todos los usuarios
export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-password'); // No mostrar password
        return res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};
