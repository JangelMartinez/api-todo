# Api Todo

La aplicación Api permite crear, modificar, leer y eliminar TODOS en una base de datos PostgresSQL.

## Stack tecnologico

Para realizar el proyecto se ha utilizado la siguiente tecnología:

- Node.js
- TypeScript
- Express
- Prisma
- BBDD Postgres
- Docker (para pruebas en local)

Los paquetes adicionales que se han utilizado son:

- dotenv
- env-var
- ts-node-dev
- rimraf


# Dev

1. Clonar el .env.template y crear el .env
2. Ejecutar el comando ```docker compose up -d``` para crear dos docker: uno con postgres y otro con adminer
3. Ejecutar ```npx prisma init --datasource-provider postgresql``` para configurar prisma con prostgress y te de en las variables de entorno una ruta de conexión a la base de datos
4. Configurar en .env la ruta de conexión a la base de datos en la variable ```POSTGRES_URL```
5. Ejecutar ```npx prisma migrate dev --name init``` para crear la base de datos en postgress


