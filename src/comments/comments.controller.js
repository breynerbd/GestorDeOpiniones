import Comment from './comments.model.js';
import Publication from '../publication/publication.model.js';
import User from '../users/user.model.js';

export const createComment = async (req, res) => {
    const { publicationId, content } = req.body;

    try {
        const publication = await Publication.findById(publicationId);
        if (!publication) {
            return res.status(404).json({ msg: 'Publicación no encontrada' });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        const newComment = new Comment({
            content,
            publication: publicationId,
            user: req.user.id
        });

        await newComment.save();
        return res.status(201).json(newComment);
    } catch (error) {
        console.error('Error al crear el comentario:', error);
        return res.status(500).json({ msg: 'Error al crear el comentario' });
    }
};

export const getComments = async (req, res) => {
    try {
        const comments = await Comment.find()
            .populate('user', 'name _id')
            .populate('publication', 'title _id')
            .sort({ createdAt: -1 });

        return res.status(200).json(comments);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error al obtener comentarios' });
    }
};

export const getCommentsByPublication = async (req, res) => {
    try {
        const { publicationId } = req.params;

        const comments = await Comment.find({ publication: publicationId })
            .populate('user', 'name _id')
            .sort({ createdAt: -1 });

        return res.status(200).json(comments);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Error al obtener comentarios' });
    }
};

export const getMyComments = async (req, res) => {
    try {
        const userId = req.user.id || req.user.uid;

        const comments = await Comment.find({ user: userId })
            .populate('publication', 'title')
            .sort({ createdAt: -1 });

        return res.status(200).json(comments);
    } catch (error) {
        console.error("Error en getMyComments:", error);
        return res.status(500).json({ msg: 'Error al obtener tus comentarios' });
    }
};

export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({ msg: 'Comentario no encontrado' });
        }

        if (comment.user.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'No tienes permiso para editar este comentario' });
        }

        comment.content = content;
        await comment.save();

        return res.status(200).json(comment);

    } catch (error) {
        return res.status(500).json({ msg: 'Error al actualizar comentario' });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({ msg: 'Comentario no encontrado' });
        }

        if (comment.user.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'No tienes permiso para eliminar este comentario' });
        }

        await comment.deleteOne();

        return res.status(200).json({ msg: 'Comentario eliminado' });

    } catch (error) {
        return res.status(500).json({ msg: 'Error al eliminar comentario' });
    }
};


