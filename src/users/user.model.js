'use strict';

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
}, { timestamps: true });

// Método para comparar contraseña
UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

export default mongoose.model('User', UserSchema);
