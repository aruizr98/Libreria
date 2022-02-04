window.addEventListener("load", iniciar);
function iniciar(){
    var registro=document.getElementById("registro");
    var nombreUsuario=document.getElementsByName("nombreUsuario")[0];
    var email=document.getElementsByName("email")[0];
    var password=document.getElementsByName("password");
    console.log(password);
    var resultadoRegistro=document.getElementById("resultadoRegistro");

    registro.addEventListener("submit", function(e){
        e.preventDefault();
        console.log("a");
        localStorage.setItem("nombreUsuario", nombreUsuario.value);
        localStorage.setItem("email", email.value);
        localStorage.setItem("password", password[0].value);
        resultadoRegistro.innerText="Registro realizado correctamente."
        location.href="Index.html";
    })
}