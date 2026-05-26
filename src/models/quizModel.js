var database = require("../database/config");

function salvar(
    pontuacao,
    acertos,
    erros,
    porcentagem,
    fkUsuario
) {

    var instrucaoSql = `

        INSERT INTO quiz
        (pontuacao, acertos, erros, porcentagemAcertos, fkUsuario)

        VALUES (
            ${pontuacao},
            ${acertos},
            ${erros},
            ${porcentagem},
            ${fkUsuario}
        );

    `;

    return database.executar(instrucaoSql);
}


function buscarDadosDashboard(fkUsuario) {

    var instrucaoSql = `
    
        SELECT

            (
                SELECT COUNT(*)
                FROM quiz
                WHERE fkUsuario = ${fkUsuario}
            ) AS totalQuiz,

            (
                SELECT MAX(pontuacao)
                FROM quiz
                WHERE fkUsuario = ${fkUsuario}
            ) AS maiorPontuacao,

            (
                SELECT AVG(porcentagemAcertos)
                FROM quiz
                WHERE fkUsuario = ${fkUsuario}
            ) AS media,

            perfil.nivel,
            perfil.titulo

        FROM perfil

        WHERE perfil.fkUsuario = ${fkUsuario};

    `;

    return database.executar(instrucaoSql);
}

function buscarRanking() {

    var instrucaoSql = `

        SELECT
            usuario.nome,
            MAX(quiz.pontuacao) AS maiorPontuacao
        FROM quiz
        JOIN usuario
            ON quiz.fkUsuario = usuario.idUsuario
        GROUP BY usuario.nome
        ORDER BY maiorPontuacao DESC
        LIMIT 5;

    `;

    return database.executar(instrucaoSql);
}

function listarPontuacoes(fkUsuario) {

    var instrucaoSql = `

        SELECT pontuacao, dtHora
        FROM quiz
        WHERE fkUsuario = ${fkUsuario}
        ORDER BY idQuiz;

    `;

    return database.executar(instrucaoSql);
}

function buscarMediaUsuario(fkUsuario) {

    var instrucaoSql = `

        SELECT AVG(porcentagemAcertos) AS media
        FROM quiz
        WHERE fkUsuario = ${fkUsuario};

    `;

    return database.executar(instrucaoSql);
}

function atualizarPerfil(nivel, titulo, fkUsuario) {

    var instrucaoSql = `

        UPDATE perfil
        SET
            nivel = '${nivel}',
            titulo = '${titulo}'
        WHERE fkUsuario = ${fkUsuario};

    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    salvar,
    atualizarPerfil,
    buscarDadosDashboard,
    listarPontuacoes,
    buscarRanking,
    buscarMediaUsuario
};