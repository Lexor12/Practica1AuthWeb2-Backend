-- Borra la base de datos si ya existe, para empezar de cero cada vez que se ejecuta el script
DROP DATABASE IF EXISTS practicaauth;
CREATE DATABASE practicaauth;
USE practicaauth;

-- Catálogo de roles; los usuarios apuntan a esta tabla
CREATE TABLE roles(
    id   INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(10) NOT NULL UNIQUE -- UNIQUE evita roles repetidos
);

-- Usuarios del sistema
CREATE TABLE users(
    id       INT AUTO_INCREMENT PRIMARY KEY,
    name     VARCHAR(48)  NOT NULL,
    email    VARCHAR(128) NOT NULL UNIQUE, -- el correo es el identificador para iniciar sesión
    password VARCHAR(255) NOT NULL, -- aquí se guarda el hash de bcrypt (nunca la contraseña real)
    role_id  INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id) -- cada usuario debe tener un rol que exista
);

-- Roles fijos; sus ids quedan 1 = admin, 2 = cajero, 3 = almacen
-- (son los números que se usan al crear usuarios en auth.route.js)
INSERT INTO roles(name) VALUES
    ('admin'),
    ('cajero'),
    ('almacen');