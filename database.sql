DROP DATABASE IF EXISTS practicaAuth;
CREATE DATABASE practicaauth;
USE practicaAuth;

CREATE TABLE roles(
    id   INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(10) NOT NULL UNIQUE
);

CREATE TABLE users(
    id       INT AUTO_INCREMENT PRIMARY KEY,
    name     VARCHAR(48)  NOT NULL,
    email    VARCHAR(128) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role_id  INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);


INSERT INTO roles(name) VALUES
    ('admin'),
    ('cajero'),
    ('almacen');