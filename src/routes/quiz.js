var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

router.post("/salvar", function (req, res) {
    quizController.salvar(req, res);
});

router.get("/dashboard/:fkUsuario", function (req, res) {
    quizController.dashboard(req, res);
});

router.post("/atualizarPerfil", function(req, res){
    quizController.atualizarPerfil(req, res);
}); 
module.exports = router;