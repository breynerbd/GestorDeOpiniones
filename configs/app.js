'use strict';

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { corsOptions } from './cors-configuration.js';
import { dbConnection } from './db.js';
import { helmetConfiguration } from './helmet-configuration.js';
import { requestLimit } from '../middlewares/request-limit.js';
import { errorHandler } from '../middlewares/handle-errors.js';

import loginRoutes from '../src/login/login.routes.js';
import publicationRoutes from '../src/publication/publication.routes.js';
import commentRoutes from '../src/comments/comments.routes.js';
import userRoutes from '../src/users/user.routes.js';

const BASE_URL = '/blogKinal/v1';

const middlewares = (app) => {
    app.use(helmet(helmetConfiguration));
    app.use(cors(corsOptions));
    app.use(express.urlencoded({ extended: false, limit: '10mb' }));
    app.use(express.json({ limit: '10mb' }));
    app.use(requestLimit);
    app.use(morgan('dev'));
};

const routes = (app) => {
    app.use(`${BASE_URL}/login`, loginRoutes);
    app.use(`${BASE_URL}/publications`, publicationRoutes);
    app.use(`${BASE_URL}/comments`, commentRoutes);
    app.use(`${BASE_URL}/users`, userRoutes);
};

const initServer = async () => {
    const app = express();
    const PORT = process.env.PORT || 3006;

    try {
        dbConnection();

        middlewares(app);
        routes(app);
        app.use(errorHandler);

        app.get(`${BASE_URL}/health`, (req, res) => {
            res.status(200).json({
                status: 'ok',
                service: 'kinalSport Admin',
                version: '1.0.0',
            });
        });

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
            console.log(`Base URL: http://localhost:${PORT}${BASE_URL}`);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
    }
};

export { initServer };
