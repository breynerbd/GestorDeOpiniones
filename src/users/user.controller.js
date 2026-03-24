import User from './user.model.js';
import bcrypt from 'bcryptjs';

export const createUser = async (req, res, next) => {
    try {
        const { username, email, password, name } = req.body;

        if (!username || !email || !password || !name) {
            return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
        }

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ msg: 'El usuario o email ya existe' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            name
        });

        await newUser.save();

        const userToReturn = {
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            name: newUser.name
        };

        return res.status(201).json(userToReturn);
    } catch (err) {
        next(err);
    }
};

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-password');
        return res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};
