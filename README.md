# 📖 Blog Kinal - Sistema de Gestión de Opiniones

![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-68A063?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-7.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-JSON_Web_Tokens-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)
![Bcrypt](https://img.shields.io/badge/Bcrypt-2.x-AE35D1?style=for-the-badge&logo=bcrypt&logoColor=white)

## 🚀 Descripción

**Blog Kinal** es una aplicación web completa para la gestión de publicaciones y comentarios, desarrollada con tecnologías modernas de JavaScript. Permite a los usuarios autenticados crear, editar, eliminar y comentar publicaciones de manera segura y eficiente.

### ✨ Características Principales

- 🔐 **Autenticación Segura**:
  - Registro e inicio de sesión con validación de datos
  - Generación de tokens JWT para sesiones seguras
  - Protección de rutas privadas
  - Cifrado de contraseñas con bcryptjs

- 📝 **Gestión de Publicaciones**:
  - Crear nuevas publicaciones con título, contenido e imagen
  - Visualización de todas las publicaciones en orden cronológico inverso
  - Edición de publicaciones propias
  - Eliminación de publicaciones propias

- 💬 **Sistema de Comentarios**:
  - Comentar en cualquier publicación
  - Ver todos los comentarios de una publicación
  - Editar comentarios propios
  - Eliminar comentarios propios

- 🛡️ **Seguridad y Rendimiento**:
  - Protección contra ataques CSRF con helmet
  - Limitación de peticiones (rate limiting)
  - Validación de datos con express-validator
  - Manejo de errores centralizado
  - Logs de peticiones con morgan

- 🎨 **Experiencia de Usuario**:
  - Interfaz moderna y responsive
  - Navegación fluida entre páginas
  - Mensajes de error claros y útiles
  - Indicadores visuales de estado

## 🛠️ Tecnologías Utilizadas

### Frontend

- **React 18.2** - Biblioteca de interfaces de usuario
- **Vite** - Entorno de desarrollo rápido
- **Axios** - Cliente HTTP para peticiones API
- **React Router DOM** - Enrutamiento de aplicaciones

### Backend

- **Node.js 20.x** - Entorno de ejecución JavaScript
- **Express 5.x** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación basada en tokens
- **Bcryptjs** - Cifrado de contraseñas
- **Cloudinary** - Almacenamiento de imágenes
- **Multer** - Middleware para manejo de archivos

### Herramientas de Desarrollo

- **Nodemon** - Reinicio automático del servidor
- **Morgan** - Middleware de logging
- **Helmet** - Protección de headers HTTP
- **Cors** - Configuración de Cross-Origin Resource Sharing
- **Dotenv** - Variables de entorno
- **Express-validator** - Validación de datos
- **Express-rate-limit** - Limitación de peticiones

## 📂 Estructura del Proyecto

```
GestorDeOpiniones/
├── frontend/              # Código del frontend en React
├── src/                 # Código del backend en Node.js
│   ├── config/          # Configuraciones del sistema
│   ├── controllers/     # Lógica de negocio
│   ├── middlewares/     # Middlewares de Express
│   ├── models/          # Modelos de Mongoose
│   ├── routes/          # Definición de rutas
│   ├── utils/           # Utilidades del sistema
│   └── server.js        # Punto de entrada del servidor
├── .env                 # Variables de entorno (no versionar)
├── package.json         # Dependencias del proyecto
└── README.md            # Documentación del proyecto
```

## 🚀 Instalación y Ejecución

### Requisitos Previos

- **Node.js** 20.x o superior
- **MongoDB** instalado y corriendo
- **Cloudinary** cuenta (para subir imágenes)

### 1. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
PORT=3006
MONGODB_URI=mongodb://localhost:27017/blogkinal
JWT_SECRET=tu_secreto_jwt_muy_seguro
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

### 2. Instalar Dependencias

```bash
# Instalar dependencias del backend
cd GestorDeOpiniones/src
npm install

# Instalar dependencias del frontend
cd ../frontend
npm install
```

### 3. Ejecutar el Servidor

```bash
# Iniciar el servidor en modo desarrollo
cd GestorDeOpiniones/src
npm run dev
```

El servidor se iniciará en `http://localhost:3006`

### 4. Ejecutar el Frontend

```bash
# Iniciar el frontend
cd ../frontend
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

## 📝 Uso

### Flujo de Usuario

1. **Registro** - Crear una cuenta con correo y contraseña
2. **Inicio de Sesión** - Autenticarse para obtener un token
3. **Crear Publicación** - Subir imagen y agregar título y contenido
4. **Ver Publicaciones** - Navegar por el feed de publicaciones
5. **Comentar** - Dejar opiniones en las publicaciones
6. **Editar/Eliminar** - Gestionar propias publicaciones y comentarios

### Endpoints Disponibles

#### Autenticación

- `POST /auth/register` - Registrar nuevo usuario
- `POST /auth/login` - Iniciar sesión

#### Publicaciones

- `GET /publications` - Obtener todas las publicaciones
- `GET /publications/:id` - Obtener publicación por ID
- `POST /publications` - Crear nueva publicación
- `PUT /publications/:id` - Actualizar publicación
- `DELETE /publications/:id` - Eliminar publicación

#### Comentarios

- `GET /comments/:publicationId` - Obtener comentarios de una publicación
- `POST /comments` - Crear un comentario
- `PUT /comments/:id` - Actualizar un comentario
- `DELETE /comments/:id` - Eliminar un comentario

## 🔐 Consideraciones de Seguridad

- Las contraseñas se cifran con bcryptjs
- Los tokens JWT tienen expiración corta
- Se implementa rate limiting para prevenir abusos
- Helmet protege contra vulnerabilidades comunes
- Las rutas privadas requieren token de autenticación
- Validación de datos en todos los endpoints

## 📊 Métricas del Proyecto

- **Líneas de Código**: ~500+ (frontend + backend)
- **Modelos de Base de Datos**: 3 (User, Publication, Comment)
- **Middlewares**: 5+ especializados
- **Endpoints**: 15+ disponibles
- **Tecnologías**: 10+ frameworks y librerías

## 👥 Autores

Este proyecto fue desarrollado por:

- **Brey