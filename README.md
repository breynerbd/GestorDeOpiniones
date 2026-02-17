# GestorDeOpiniones
🚀 Guía de Inicio Rápido
👤 Usuario Administrador por Defecto
Al iniciar el proyecto con node index.js, el sistema crea automáticamente un perfil administrativo:

Username: admin
Email: admin@example.com
Password: admin123
Name: Administrador

🔑 Autenticación y Uso de Tokens
Para interactuar con los endpoints protegidos (Comments, Publications, Users), sigue estos pasos:

Obtener el Token: Realiza un POST al endpoint de Login. El servidor te devolverá un JSON con un campo token.
{
    "login": "admin",
    "password": "admin123"
}

Configurar Postman:
Ve a la pestaña Headers.
Agrega una nueva fila con la Key: x-auth-token.
En Value, pega el token generado sin comillas ni espacios extra.
Persistencia: Asegúrate de incluir este Header en cada nueva pestaña o petición que realices.

Nota: Si recibes un error 401 Unauthorized, verifica que el token no haya expirado y que la Key esté escrita exactamente como x-auth-token.
