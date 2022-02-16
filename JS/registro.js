window.addEventListener("load", iniciar);


function iniciar() {
    // var usuarios=[
    //     {
    //         nombre:"Alex",
    //         email:"alex@gmail.com",
    //         password:"a"
    //     },
    //     {
    //         nombre:"a",
    //         email:"a@gmail.com",
    //         password:"a"
    //     }
    // ]
    var usuarios = JSON.parse(localStorage.getItem("usuarios"));
    var bibliotecaUsuarios = JSON.parse(localStorage.getItem("bibliotecaUsuarios"));
    console.log(usuarios);
    console.log(bibliotecaUsuarios);
    var registro = document.getElementById("registro");
    var nombreUsuario = document.getElementsByName("nombreUsuario")[0];
    var emailRegistro = document.getElementsByName("email")[0];
    var passwordRegistro = document.getElementsByName("password");
    var resultadoRegistro = document.getElementById("resultadoRegistro");
    // var usuarios=new Array();

    // registro.addEventListener("submit", function(e){
    //     e.preventDefault();
    //     console.log("a");
    //     localStorage.setItem("nombreUsuario", nombreUsuario.value);
    //     localStorage.setItem("email", email.value);
    //     localStorage.setItem("password", password[0].value);
    //     resultadoRegistro.innerText="Registro realizado correctamente."
    //     location.href="Index.html";
    // })
    function validarNombre() {
        if (!nombreUsuario.checkValidity()) {
            if (nombreUsuario.validity.valueMissing) {
                error2(nombreUsuario, "Debe introducir un nombre")
            }
            if (nombreUsuario.validity.patternMismatch) {
                error2(nombreUsuario, "El nombre debe tener entre 2 y 15 caracteres");
            }
            //error(nombreUsuario);
            return false;
        }
        return true;
    }
    function validarPassword() {
        if(passwordRegistro[0].value != passwordRegistro[1].value){
            error2(passwordRegistro[0], "Las contraseñas no coinciden");
            return false;
        }
        for (let index = 0; index < passwordRegistro.length; index++) {
            if (!passwordRegistro[index].checkValidity()) {
                if (passwordRegistro[index].validity.valueMissing) {
                    error2(passwordRegistro[index], "Debe introducir una contraseña")
                }
                if (passwordRegistro[index].validity.patternMismatch) {
                    error2(passwordRegistro[index], "La contraseña debe tener entre 2 y 15 caracteres (números o letras)");
                }
                //error(passwordRegistro[index]);
                return false;
            }
            return true;
        }
        
    }
    function error2(elemento, mensaje) {
        document.getElementById("mensajeError").innerHTML = mensaje;
        elemento.classList = "form-control error";
        elemento.focus();
    }
    // function borrarError() {
    //     for (var i = 0; i < registro.children.length; i++) {
    //         registro.children[i].className = "";
    //     }
    // }
    function validar(e) {
        // borrarError();
        if (validarNombre() && validarPassword() && confirm("Pulsa aceptar si deseas enviar el formulario")) {
            return true
        } else {
            e.preventDefault();
            return false;
        }
    }
    registro.addEventListener("submit", function (e) {
        e.preventDefault();
        if(validar(e)){
            var nuevoUsuario = {
                nombre: nombreUsuario.value,
                email: emailRegistro.value,
                password: passwordRegistro[0].value
            }
            if (usuarios != null && bibliotecaUsuarios != null) {
                usuarios.push(nuevoUsuario);
                bibliotecaUsuarios.push(new Array());
            } else {
                usuarios = [nuevoUsuario];
                bibliotecaUsuarios = [new Array()];
            }
    
            console.log("Usuario añadido");
            console.log(usuarios);
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            
            localStorage.setItem("bibliotecaUsuarios", JSON.stringify(bibliotecaUsuarios));
            
            if(localStorage.getItem("aceptarCookies") == "true"){
                document.cookie="biblioteca="+localStorage.getItem("bibliotecaUsuarios");
            
                 document.cookie="usuarios="+localStorage.getItem("usuarios");
               
            }
            //resultadoRegistro.innerText = "Registro realizado correctamente."
            location.href = "Index.html";
        }
        
    })
}