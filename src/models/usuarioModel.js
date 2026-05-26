var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT idUsuario AS idUsuario, nome, email FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(nome, email, senha) {

    console.log("ACESSEI O USUARIO MODEL");

    var instrucaoSql = `
        INSERT INTO usuario (nome, email, senha)
        VALUES ('${nome}', '${email}', '${senha}');
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql)

        .then(function (resultado) {

            console.log("RESULTADO:", resultado);

            var idUsuario = resultado.insertId;

            var instrucaoPerfil = `
            
                INSERT INTO perfil
                (nivel, titulo, fkUsuario)

                VALUES (
                    '初級 • Iniciante',
                    '温泉好きの初心者 • Curioso de Onsens',
                    ${idUsuario}
                );
            `;

            return database.executar(instrucaoPerfil);

        });

}

module.exports = {
    autenticar,
    cadastrar
};