window.addEventListener("load", iniciar);
function iniciar() {
    var modificar = document.getElementById("modificarCuenta");
    var nombreUsuario = document.getElementsByName("nombreUsuario")[0];
    var email = document.getElementsByName("email")[0];
    var password = document.getElementsByName("password");
    var usuarios = JSON.parse(localStorage.getItem("usuarios"));
    for (let index = 0; index < usuarios.length; index++) {
        if (usuarios[index].nombre == localStorage.getItem("nombreUsuario")) {
            nombreUsuario.value = usuarios[index].nombre;
            email.value = usuarios[index].email;
            password[0].value = usuarios[index].password;
            password[1].value = usuarios[index].password;
        }
    }

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
        if(password[0].value != password[1].value){
            error2(password[0], "Las contraseñas no coinciden");
            return false;
        }
        for (let index = 0; index < password.length; index++) {
            if (!password[index].checkValidity()) {
                if (password[index].validity.valueMissing) {
                    error2(password[index], "Debe introducir una contraseña")
                }
                if (password[index].validity.patternMismatch) {
                    error2(password[index], "La contraseña debe tener entre 2 y 15 caracteres (números o letras)");
                }
                //error(password[index]);
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
    modificar.addEventListener("submit", function (e) {
        e.preventDefault();
        for (let index = 0; index < usuarios.length; index++) {
            if (usuarios[index].nombre == localStorage.getItem("nombreUsuario")) {
                if(validar(e)){
                usuarios.splice(index, 1); //elimina el usuario del array
                var usuarioEditado = {
                    nombre: nombreUsuario.value,
                    email: email.value,
                    password: password[0].value
                }
                usuarios.push(usuarioEditado);
                localStorage.setItem("usuarios", JSON.stringify(usuarios));
                localStorage.setItem("nombreUsuario", nombreUsuario.value);
                alert("Usuario editado correctamente.");
            }

            }

        }
    })

}