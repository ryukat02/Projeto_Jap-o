var quizModel = require("../models/quizModel");

function salvar(req, res) {

    var pontuacao = req.body.pontuacaoServer;
    var acertos = req.body.acertosServer;
    var erros = req.body.errosServer;
    var porcentagem = req.body.porcentagemServer;
    var fkUsuario = req.body.fkUsuarioServer;

    quizModel.salvar(
        pontuacao,
        acertos,
        erros,
        porcentagem,
        fkUsuario
    )

        .then(function () {

            return quizModel.buscarMediaUsuario(fkUsuario);

        })

        .then(function (resultadoMedia) {

            var media = Number(resultadoMedia[0].media);

            var nivel = "";
            var titulo = "";

            if (media >= 90) {

                nivel = "上級 • Avançado";
                titulo = "温泉の守護者 • Guardião dos Onsens";

            } else if (media >= 60) {

                nivel = "中級 • Intermediário";
                titulo = "別府の探検者 • Explorador de Beppu";

            } else {

                nivel = "初級 • Iniciante";
                titulo = "温泉好きの初心者 • Curioso de Onsens";

            }

            return quizModel.atualizarPerfil(
                nivel,
                titulo,
                fkUsuario
            );

        })

        .then(function () {

            res.json({
                mensagem: "Quiz salvo e perfil atualizado!"
            });

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

            console.log(resultado);

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