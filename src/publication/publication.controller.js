// src/publication/publication.controller.js

import Publication from './publication.model.js';
import User from '../users/user.model.js';

export const createPublication = async (req, res) => {
    const { title, category, content } = req.body;

    try {
        const user = await User.findById(req.user.id);  // Asumiendo que tienes la autenticación en el middleware

        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        const newPublication = new Publication({
            title,
            category,
            content,
            user: req.user.id
        });

        await newPublication.save();
        return res.status(201).json(newPublication);
    } catch (error) {
        console.error('Error al crear la publicación:', error);
        return res.status(500).json({ msg: 'Error al crear la publicación' });
    }
};

export const getPublications = async (req, res) => {
    try {
        const publications = await Publication.find().populate('user', 'name');  // Populate para mostrar el nombre del usuario
        return res.status(200).json(publications);
    } catch (error) {
        console.error('Error al obtener publicaciones:', error);
        return res.status(500).json({ msg: 'Error al obtener publicaciones' });
    }
};
