import Comment from './comments.model.js';
import Publication from '../publication/publication.model.js';
import User from '../users/user.model.js';

export const createComment = async (req, res) => {
    const { publicationId, content } = req.body;

    try {
        // Verificar que la publicación existe
        const publication = await Publication.findById(publicationId);
        if (!publication) {
            return res.status(404).json({ msg: 'Publicación no encontrada' });
        }

        // Verificar que el usuario existe
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        // Crear el comentario
        const newComment = new Comment({
            content,
            publication: publicationId,
            user: req.user.id
        });

        await newComment.save();
        return res.status(201).json(newComment);  // Retornar la respuesta con el comentario creado
    } catch (error) {
        console.error('Error al crear el comentario:', error);
        return res.status(500).json({ msg: 'Error al crear el comentario' });
    }
};

export const getComments = async (req, res) => {
    try {
        const comments = await Comment.find().populate('user', 'name');  // Populate para mostrar el nombre del usuario
        return res.status(200).json(comments);
    } catch (error) {
        console.error('Error al obtener comentarios:', error);
        return res.status(500).json({ msg: 'Error al obtener comentarios' });
    }
};
