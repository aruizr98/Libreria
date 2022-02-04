window.addEventListener("load", iniciar);

function iniciar() {
    var busqueda = document.getElementById("busqueda");
    var portadas = document.getElementsByClassName("portada");
    var descripcion = document.getElementsByClassName("card-text");
    var titulos = document.getElementsByClassName("titulo");
    var precios = document.getElementsByClassName("precio");
    var ofertas = document.getElementsByClassName("oferta");
    var botonesCompra = document.getElementsByClassName("comprar");
    var conectadoComo = document.getElementById("conectadoComo");
    var botonIniciarSesion = document.getElementById("botoniniciarSesion");
    var botonRegistrarse = document.getElementById("botonRegistrarse");
    var botonCerrarSesion=document.getElementById("botonCerrarSesion");
    var limite;

    function getJSON(libro) {
        var xhr = new XMLHttpRequest(); //Se crea el objeto
        xhr.open("GET", "https://www.googleapis.com/books/v1/volumes?q=" + libro, true); //Abrir una petición
        xhr.onreadystatechange = function () { //función callback
            if (this.readyState == 4 && //para cuando se 
                this.status == 200) { //reciba la respuesta
                procesarJSON(this);
            }

        };
        xhr.send(); //enviar petición
    }

    function procesarJSON(xhr) {
        var jsonDoc = JSON.parse(xhr.responseText); // tratar el objeto json
        var libros = new Array();
        /*Obtener solamente los libros que tienen descripción y portada
         para que no aparezca undefined en la descripción en caso de no tenerla.
        */
        for (let index = 0; index < jsonDoc.items.length; index++) {
            if (jsonDoc.items[index].volumeInfo.description != undefined && jsonDoc.items[index].volumeInfo.imageLinks != undefined) {
                libros.push(jsonDoc.items[index]);
            }
        }

        console.log("libros.length: " + libros.length);
        console.log("portadas: " + portadas.length);
        console.log("Descripción: " + descripcion.length);
        console.log(libros);
        //document.getElementById("foto").setAttribute("src",jsonDoc.items[1].volumeInfo.imageLinks.smallThumbnail );

        // if(libros.length < portadas.length){
        //     let diferencia=portadas.length-libros.length;
        //     console.log("Diferencia: "+diferencia);
        //     for (let index = portadas.length-diferencia; index < portadas.length; index++) {
        //        descripcion[index].parentElement.parentElement.parentElement.remove();
        //        index--;
        //     }
        // }

        if (libros.length < 10) { //Para no sobrepasar el límite de 9 libros por página
            limite = libros.length;
        } else {
            limite = portadas.length;
        }

        // if(libros.length < portadas.length){
        //     diferencia= portadas.length-libros.length;
        //     console.log(diferencia);
        //     for (let index = portadas.length-diferencia; index < portadas.length; index++) {
        //         portadas[index].parentElement.parentElement.setAttribute("style", "display:block;");

        //     }
        // }

        for (let index = 0; index < limite; index++) {
            //Se añade la portada, la sinopsis y el título de cada libro
            portadas[index].setAttribute("src", libros[index].volumeInfo.imageLinks.thumbnail);
            descripcion[index].innerText = libros[index].volumeInfo.description;
            titulos[index].innerText = libros[index].volumeInfo.title;

            if (libros[index].saleInfo.saleability == "FOR_SALE") {
                /*
                Si el libro está a la venta, se muestra el precio y los botones de compra
                */
                precios[index].innerText = libros[index].saleInfo.listPrice.amount + "€";
                botonesCompra[index].setAttribute("style", "display:block;");
                descripcion[index].parentElement.parentElement.setAttribute("style", "opacity:1;");

                if (libros[index].saleInfo.retailPrice.amount < libros[index].saleInfo.listPrice.amount) {
                    /*
                    Si el libro tiene oferta, se tachará el precio sin oferta y se mostrará a su lado el nuevo precio
                    */
                    precios[index].classList = "precio text-decoration-line-through";
                    ofertas[index].innerText = libros[index].saleInfo.retailPrice.amount + " €";
                } else { //Si no tiene oferta, se deja todo como estaba para que en futuras búsquedas no de información errónea
                    precios[index].classList = "precio";
                    ofertas[index].innerText = "";
                }
            } else {
                /*Si no está a la venta el libro aparecerá con baja opacidad,
                 se eliminan los botones de compra y en lugar del precio 
                 se muestra que el producto no está disponible
                */
                precios[index].classList = "precio";
                ofertas[index].innerText = "";
                precios[index].innerText = "Producto no disponible";
                botonesCompra[index].setAttribute("style", "display:none;");
                descripcion[index].parentElement.parentElement.setAttribute("style", "opacity:0.4;");
            }

        }
        for (let index = 0; index < descripcion.length; index++) {
            /*
                En el caso en el que haya menos libros que tarjetas, se ocultarán las tarjetas restantes
            */
            if (descripcion[index].innerText == "prueba") {
                descripcion[index].parentElement.parentElement.parentElement.setAttribute("style", "display:none;");
            } else {
                descripcion[index].parentElement.parentElement.parentElement.setAttribute("style", "display:block;");
            }
        }
    }
    function cerrarSesion(){
        sessionStorage.setItem("conectado", "false");
        location.reload();
    }
    getJSON("*");
    if (sessionStorage.getItem("conectado") == "true") {
        console.log("aaaaa");
        conectadoComo.firstElementChild.innerText = "Conectado como: " + localStorage.getItem("nombreUsuario");
        console.log(botonIniciarSesion);
        console.log(botonRegistrarse);
        botonIniciarSesion.setAttribute("style", "display:none;");
        botonRegistrarse.setAttribute("style", "display:none;");
    } else {
        conectadoComo.setAttribute("style", "display:none;");
        botonIniciarSesion.setAttribute("style", "display:'';");
        botonRegistrarse.setAttribute("style", "display:'';");
    }
    botonCerrarSesion.addEventListener("click", cerrarSesion);
    busqueda.addEventListener("input", function (e) {
        getJSON(busqueda.value);
    })
    busqueda.addEventListener("click", function () {
        busqueda.value = "";
    })


}