// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var b_usuario = document.getElementById("b_usuario");

    if (email != null && nome != null) {
        b_usuario.innerHTML = nome;
    } else {
        window.location = "./login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "./login.html";
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";
}

function mostrarErroLogin() {
    var divErrosLogin = document.getElementById("div_erros_login");
    

    if(document.documentElement.lang == "ja"){

        div_erros_login.innerHTML = 
        "メールアドレスまたはパスワードが違います";

    } else {

        div_erros_login.innerHTML = 
        "Email e/ou senha inválido(s)";

    }

    div_erros_login.style.display = "block";
}

