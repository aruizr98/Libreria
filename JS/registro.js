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
    console.log(usuarios);
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
    registro.addEventListener("submit", function (e) {
        e.preventDefault();
        var nuevoUsuario = {
            nombre: nombreUsuario.value,
            email: emailRegistro.value,
            password: passwordRegistro[0].value
        }
        if(usuarios!=null){
          usuarios.push(nuevoUsuario);  
        }else{
            usuarios=[nuevoUsuario];
        }
        
        console.log("Usuario añadido");
        console.log(usuarios);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        resultadoRegistro.innerText = "Registro realizado correctamente."
        location.href = "Index.html";
    })
}