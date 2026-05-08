var quizModel = require("../models/quizModel");

function salvar(req, res) {

    var pontuacao = req.body.pontuacaoServer;
    var acertos = req.body.acertosServer;
    var erros = req.body.errosServer;
    var porcentagem = req.body.porcentagemServer;
    var fkUsuario = req.body.fkUsuarioServer;

    var nivel = "";
    var titulo = "";

    if (porcentagem >= 90) {

        nivel = "Avançado - 上級";
        titulo = "Guardião dos Onsens - 温泉の守護者";

    } else if (porcentagem >= 60) {

        nivel = "Intermediário - 中級";
        titulo = "Explorador de Beppu - 別府の探検家";

    } else {

        nivel = "Iniciante - 初心者";
        titulo = "Visitante - 訪問者";
    }

    quizModel.salvar(
        pontuacao,
        acertos,
        erros,
        porcentagem,
        fkUsuario,
        nivel, 
        titulo
    )
        .then(function (resultado) {

            quizModel.atualizarPerfil(
                nivel,
                titulo,
                fkUsuario
            );

            res.json(resultado);

        })
        .catch(function (erro) {

            console.log(erro);
            res.status(500).json(erro.sqlMessage);

        });

}
function dashboard(req, res) {

    var fkUsuario = req.params.fkUsuario;

    quizModel.buscarDadosDashboard(fkUsuario)
        .then(function (resultado) {

            quizModel.listarPontuacoes(fkUsuario)
                .then(function (resultadoPontuacoes) {

                    quizModel.buscarRanking()
                        .then(function (resultadoRanking) {

                            res.json({
                                totalQuiz: resultado[0].totalQuiz,
                                maiorPontuacao: resultado[0].maiorPontuacao,
                                media: resultado[0].media,
                                nivel: resultado[0].nivel,
                                titulo: resultado[0].titulo,
                                listaPontuacoes: resultadoPontuacoes,
                                rankingUsuarios: resultadoRanking
                            });

                        });

                });

        }).catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro);
        });

}


module.exports = {
    salvar,
    dashboard
};