import User from '../users/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    const { login, password } = req.body;

    try {
        const user = await User.findOne({
            $or: [{ email: login }, { username: login }]
        });

        if (!user) {
            return res.status(400).json({ msg: 'Usuario no encontrado' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Contraseña incorrecta' });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                username: user.username,
                email: user.email
            }
        });

    } catch (err) {
        console.error('Error al realizar el login:', err);
        return res.status(500).json({ msg: 'Error del servidor' });
    }
};

export const register = async (req, res) => {
    const { username, name, email, password } = req.body;

    try {
        const userExists = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (userExists) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        const user = new User({
            username,
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        res.status(201).json({ msg: 'Usuario creado exitosamente' });

    } catch (err) {
        console.error('Error al registrar usuario:', err);
        res.status(500).json({ msg: 'Error del servidor' });
    }
};