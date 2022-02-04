window.addEventListener("load", iniciar);
function iniciar(){
    var email=document.getElementsByName("email")[0];
    var password=document.getElementsByName("password")[0];
    var formulario=document.getElementById("inicioSesion");
    var mensaje=document.getElementById("mensaje");

    formulario.addEventListener("submit", function(e){
        e.preventDefault();
        if(email.value==localStorage.getItem("email") && password.value==localStorage.getItem("password")){
            sessionStorage.setItem("conectado", "true");
            mensaje.innerText="";
            mensaje.classList="";
            location.href="Index.html";
           
            
        }else{
            console.log("aa");
            mensaje.innerText="Error. Email o contraseña incorrectos";
            mensaje.classList="bg-danger";
            sessionStorage.setItem("conectado", "false");
        
        }
    });

}