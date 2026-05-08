const bus = require("nodemon/lib/utils/bus");
var database = require("../database/config");

function salvar(
    pontuacao,
    acertos,
    erros,
    porcentagem,
    fkUsuario,
    nivel,
    titulo
) {

    var instrucaoSql = `

        INSERT INTO quiz
        (pontuacao, acertos, erros, porcentagemAcertos, fkUsuario, nivel, titulo)

        VALUES (
            ${pontuacao},
            ${acertos},
            ${erros},
            ${porcentagem},
            ${fkUsuario},
            ${nivel},
            ${titulo}
        );

    `;

    return database.executar(instrucaoSql);
}
function buscarDadosDashboard(fkUsuario) {

    var instrucaoSql = `
    
        SELECT
            COUNT(idQuiz) AS totalQuiz,
            MAX(pontuacao) AS maiorPontuacao,
            AVG(porcentagemAcertos) AS media,
            MAX(nivel) AS nivel,
            MAX(titulo) AS titulo

        FROM quiz

        WHERE fkUsuario = ${fkUsuario};

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
    buscarDadosDashboard,
    listarPontuacoes,
    buscarRanking,
    atualizarPerfil
};