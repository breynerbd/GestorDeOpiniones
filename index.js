// index.js
import dotenv from 'dotenv';
import { initServer } from './configs/app.js';  // Importamos la función para inicializar el servidor
import User from './src/users/user.model.js';
import bcrypt from 'bcryptjs';

// Configuración de variables de entorno
dotenv.config();

const createDefaultUser = async () => {
    try {
        const existing = await User.findOne({ username: 'admin' });
        if (existing) {
            console.log('Usuario por defecto ya existe');
            return;
        }

        const hashed = await bcrypt.hash('admin123', 10);
        const defaultUser = new User({
            username: 'admin',
            email: 'admin@example.com',
            password: hashed,
            name: 'Administrador',
        });

        await defaultUser.save();
        console.log('Usuario por defecto creado: admin / admin123');
    } catch (err) {
        console.error('Error creando usuario por defecto', err);
    }
};

createDefaultUser();

// Errores no capturados
process.on('uncaughtException', (error) => {
    console.log(error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.log(reason, promise);
    process.exit(1);
});

// Inicialización del servidor
console.log('Iniciando servidor de KinalSport...');
initServer();  // Llamamos a initServer para iniciar la aplicación
