window.addEventListener("load", iniciar);
function iniciar() {
    var datosCesta = JSON.parse(localStorage.getItem("cesta"));
    var productosCesta = document.getElementById("productosCesta");
    var vaciar = document.getElementById("vaciar");
    var comprar=document.getElementById("comprar");
    var usuarios = JSON.parse(localStorage.getItem("usuarios"));
    var bibliotecaUsuarios = JSON.parse(localStorage.getItem("bibliotecaUsuarios"));

    if (datosCesta == null) { // Si la cesta está vacía
        var div = document.createElement("div");
        div.append("El carrito está vacío");
        div.setAttribute("style", "border:1px solid black; font-size:40px; text-align:center");

        productosCesta.append(div);
        //productosCesta.innerText="Cesta vacía";
    } else {
        var total = 0;
        for (let index = 0; index < datosCesta.length; index++) {
            if (datosCesta[index].saleInfo.saleability == "FOR_SALE") {
                let li = document.createElement("li");
                li.classList = "list-group-item d-flex justify-content-between lh-sm";
                let div = document.createElement("div");
                let h5 = document.createElement("h5");
                let h6=document.createElement("h6");
                h5.innerText = datosCesta[index].volumeInfo.title;
                h6.innerText=datosCesta[index].volumeInfo.authors[0];
                h5.classList = "my-0";
                div.append(h5);
                div.append(h6);
                li.append(div);
                let span = document.createElement("span");
                span.classList = "text-muted";
                span.innerText = datosCesta[index].saleInfo.retailPrice.amount + " €";
                li.append(span);
                productosCesta.append(li);
                total += datosCesta[index].saleInfo.retailPrice.amount;
            }

        }
        let li2 = document.createElement("li");
        li2.classList = "list-group-item d-flex justify-content-between";
        let span = document.createElement("span");
        span.innerText = "Total: ";
        li2.append(span);
        let strong = document.createElement("strong");
        strong.innerText = total + " €";
        li2.append(strong);
        productosCesta.append(li2);
    }
    vaciar.addEventListener("click", function () {
        localStorage.removeItem("cesta");
        location.reload();
    })
    comprar.addEventListener("click", function () {
        if(sessionStorage.getItem("conectado") == "true" || localStorage.getItem("conectado") == "true"){
            for (var index = 0; index < usuarios.length; index++) {
               if(localStorage.getItem("nombreUsuario") == usuarios[index].nombre){
                //pasar los libros de la cesta a otro array de objetos del usuario conectado.
                for (let j = 0; j < datosCesta.length; j++) {
                    bibliotecaUsuarios[index].push(datosCesta[j]);
                    
                }
                localStorage.setItem("bibliotecaUsuarios", JSON.stringify(bibliotecaUsuarios));
                alert("libros añadidos");   
                location.href="Index.html";
               }
            }
            console.log(bibliotecaUsuarios); 
            //Crear un array de objetos para cada usuario registrado y añadir los libros que hay en la cesta al usuario que esté conectado.
        }else{
            location.href="iniciarSesion.html";
        }
    })
}