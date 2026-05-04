CREATE DATABASE beppu;

USE beppu;

CREATE TABLE usuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(50),
email VARCHAR(50),
senha VARCHAR(50)
);

CREATE TABLE quiz (
idQuiz INT PRIMARY KEY AUTO_INCREMENT,
pontuacao INT,
porcentagemAcertos CHAR(3),
dtHora DATETIME DEFAULT CURRENT_TIMESTAMP,
fkUsuario INT,
CONSTRAINT chk_usuario FOREIGN KEY (fkUsuario) REFERENCES usuario (idUsuario)
); 