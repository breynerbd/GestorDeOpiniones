// src/publication/publication.model.js

import mongoose from 'mongoose';

const PublicationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    content: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export default mongoose.model('Publication', PublicationSchema);
