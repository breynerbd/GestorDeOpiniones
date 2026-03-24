import Publication from './publication.model.js';
import User from '../users/user.model.js';

export const createPublication = async (req, res) => {
    const { title, category, content } = req.body;

    try {
        const user = await User.findById(req.user.id);

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
        const publications = await Publication.find()
            .populate('user', 'name');

        return res.status(200).json(publications);

    } catch (error) {
        console.error('Error al obtener publicaciones:', error);
        return res.status(500).json({ msg: 'Error al obtener publicaciones' });
    }
};

export const updatePublication = async (req, res) => {
    const { id } = req.params;
    const { title, content, category } = req.body;

    try {
        const publication = await Publication.findById(id);

        if (!publication) {
            return res.status(404).json({ msg: "Publicación no encontrada" });
        }

        if (publication.user.toString() !== req.user.id) {
            return res.status(403).json({ msg: "No autorizado" });
        }

        publication.title = title || publication.title;
        publication.content = content || publication.content;
        publication.category = category || publication.category;

        await publication.save();

        return res.json(publication);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Error al actualizar" });
    }
};

export const deletePublication = async (req, res) => {
    const { id } = req.params;

    try {
        const publication = await Publication.findById(id);

        if (!publication) {
            return res.status(404).json({ msg: "Publicación no encontrada" });
        }

        if (publication.user.toString() !== req.user.id) {
            return res.status(403).json({ msg: "No autorizado" });
        }

        await publication.deleteOne();

        return res.json({ msg: "Publicación eliminada" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Error al eliminar" });
    }
};


