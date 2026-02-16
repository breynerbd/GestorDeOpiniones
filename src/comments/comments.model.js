// src/comments/comment.model.js

import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    content: { type: String, required: true },
    publication: { type: mongoose.Schema.Types.ObjectId, ref: 'Publication', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export default mongoose.model('Comment', CommentSchema);
