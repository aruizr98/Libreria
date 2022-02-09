window.addEventListener("load", iniciar);

function iniciar() {
    var email = document.getElementsByName("email")[0];
    var password = document.getElementsByName("password")[0];
    var formulario = document.getElementById("inicioSesion");
    var mensaje = document.getElementById("mensaje");
    var usuarios = JSON.parse(localStorage.getItem("usuarios"));
    var registrarse=document.getElementById("registrate");
    var recuerdame=document.getElementById("recuerdame");
    console.log(usuarios);

    formulario.addEventListener("submit", function (e) {
        e.preventDefault();
        // if(email.value==localStorage.getItem("email") && password.value==localStorage.getItem("password")){
        //     sessionStorage.setItem("conectado", "true");
        //     mensaje.innerText="";
        //     mensaje.classList="";
        //     location.href="Index.html";


        // }else{
        //     console.log("aa");
        //     mensaje.innerText="Error. Email o contraseña incorrectos";
        //     mensaje.classList="bg-danger";
        //     sessionStorage.setItem("conectado", "false");

        // }
        var correcto = false;
        for (let index = 0; index < usuarios.length; index++) {
            if (email.value == usuarios[index].email && password.value == usuarios[index].password) {
                sessionStorage.setItem("conectado", "true");
                mensaje.innerText = "";
                mensaje.classList = "";
                correcto = true;
                localStorage.setItem("nombreUsuario", usuarios[index].nombre);
                if(recuerdame.checked){
                   localStorage.setItem("conectado", "true");
                }else{
                    localStorage.setItem("conectado", "false");
                }
                location.href = "Index.html";
            }
        }
        if (!correcto) {
            mensaje.innerText = "Error. Email o contraseña incorrectos";
            mensaje.classList = "bg-danger";
            sessionStorage.setItem("conectado", "false");
        }
    });
    registrarse.addEventListener("click", function(){
        location.href="registro.html";
    })
}