# Task Manager Backend

Este repositorio contiene la API backend para la aplicación de Gestión de Tareas, construida con NestJS y Prisma. Proporciona una API RESTful para la autenticación de usuarios y la gestión de tareas, utilizando SQLite como base de datos.

## Tecnologías

- NestJS: Un framework progresivo de Node.js para construir aplicaciones del lado del servidor eficientes y escalables.
- Prisma: ORM de próxima generación para Node.js y TypeScript.
- SQLite: Una biblioteca en lenguaje C que implementa un motor de base de datos SQL pequeño, rápido, autónomo y de alta fiabilidad.
- Passport & JWT: Middleware para manejar la autenticación y la generación/validación de JSON Web Tokens.
- Bcrypt: Biblioteca para el hash de contraseñas.

## Prerrequisitos

- Node.js (Se recomienda la última versión LTS)
- npm (Gestor de paquetes de Node)

## Instalación y Configuración

1. Clona el repositorio y navega al directorio del backend.

2. Instala las dependencias del proyecto:

   npm install

3. Configuración de la Base de Datos:

   Este proyecto utiliza Prisma con SQLite. Necesitas ejecutar las migraciones para crear el archivo de base de datos (`dev.db`) y generar el Cliente de Prisma.

   npx prisma migrate dev --name init

   Este comando realizará lo siguiente:
    - Creará un archivo `dev.db` en el directorio `prisma` si no existe.
    - Aplicará el esquema definido en `prisma/schema.prisma`.
    - Generará las definiciones de tipo del Cliente de Prisma.

4. Variables de Entorno:

   Asegúrate de tener un archivo `.env` o configuración para el puerto de escucha. Por defecto, `src/main.ts` escucha en el puerto 3001.

## Ejecución de la Aplicación

Para iniciar el servidor de desarrollo con el modo de observación habilitado:

npm run start:dev

El servidor se iniciará en http://localhost:3001.

Para construir y ejecutar para producción:

npm run build
npm run start:prod

## Endpoints de la API

La API expone los siguientes endpoints. Ten en cuenta que la mayoría de los endpoints de Tareas requieren un Token Bearer (JWT) válido obtenido a través del inicio de sesión.

### Autenticación

- POST /auth/register
  Registrar un nuevo usuario.
  Cuerpo: { "email": "usuario@ejemplo.com", "password": "password123", "name": "Juan Perez" }

- POST /auth/login
  Autenticar un usuario y obtener un token de acceso.
  Cuerpo: { "email": "usuario@ejemplo.com", "password": "password123" }

- GET /auth/profile
  Obtener el perfil del usuario autenticado actualmente.
  Cabeceras: Authorization: Bearer <token>

### Tareas

Todos los endpoints de tareas requieren cabeceras de autenticación (Authorization: Bearer <token>).

- GET /tasks
  Recuperar todas las tareas para el usuario autenticado.
  Parámetros de Consulta (Opcional):
    - completed (boolean): Filtrar por estado de finalización.
    - category (string): Filtrar por categoría.

- POST /tasks
  Crear una nueva tarea.
  Cuerpo: { "title": "Título de Tarea", "description": "Descripción opcional", "dueDate": "ISO-Date", "category": "Trabajo" }

- PUT /tasks/:id
  Actualizar una tarea existente.
  Cuerpo: { "title": "Nuevo Título", "completed": true, ... }

- PATCH /tasks/:id/complete
  Marcar una tarea específica como completada.

- DELETE /tasks/:id
  Eliminar una tarea específica.
