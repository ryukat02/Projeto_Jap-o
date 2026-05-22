CREATE DATABASE beppu;

USE beppu;

CREATE TABLE usuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(50),
email VARCHAR(50) UNIQUE,
senha VARCHAR(50)
);

CREATE TABLE quiz (
idQuiz INT PRIMARY KEY AUTO_INCREMENT,
pontuacao INT,
acertos INT, 
erros INT,
porcentagemAcertos DECIMAL (5,2),
dtHora DATETIME DEFAULT CURRENT_TIMESTAMP,
fkUsuario INT,
CONSTRAINT chk_usuario FOREIGN KEY (fkUsuario) REFERENCES usuario (idUsuario),
nivel VARCHAR(45),
titulo VARCHAR(45)
); 

CREATE TABLE perfil (
idPerfil INT PRIMARY KEY AUTO_INCREMENT,
nivel VARCHAR(30), 
titulo VARCHAR(50),
fkUsuario INT,
CONSTRAINT chk_perfilUser FOREIGN KEY (fkUsuario) REFERENCES usuario (idUsuario)
); 