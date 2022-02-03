window.addEventListener("load", iniciar);
function iniciar() {
    var busqueda = document.getElementById("busqueda");
    var portadas = document.getElementsByClassName("portada");
    var descripcion = document.getElementsByClassName("card-text");
    var titulos = document.getElementsByClassName("titulo");
    var precios = document.getElementsByClassName("precio");
    var ofertas = document.getElementsByClassName("oferta");
    var botonesCompra = document.getElementsByClassName("comprar");
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
        var limite;
        console.log(botonesCompra);
        if(libros.length<10){
            limite=libros.length;
        }else{
            limite=libros.length-portadas.length;
        }
        for (let index = 0; index < limite; index++) {

            portadas[index].setAttribute("src", libros[index].volumeInfo.imageLinks.thumbnail);
            descripcion[index].innerText = libros[index].volumeInfo.description;
            titulos[index].innerText = libros[index].volumeInfo.title;

            if (libros[index].saleInfo.saleability == "FOR_SALE") {
                precios[index].innerText = libros[index].saleInfo.listPrice.amount + "€";
                botonesCompra[index].setAttribute("style", "display:block;");
                descripcion[index].parentElement.parentElement.setAttribute("style", "opacity:1;");
                
                if(libros[index].saleInfo.retailPrice.amount <libros[index].saleInfo.listPrice.amount){
                    precios[index].classList="precio text-decoration-line-through";
                    ofertas[index].innerText=libros[index].saleInfo.retailPrice.amount+" €";
                }else{
                    precios[index].classList="precio";
                    ofertas[index].innerText="";
                }
            } else {
                precios[index].classList="precio";
                    ofertas[index].innerText="";
                precios[index].innerText = "Producto no disponible";
                botonesCompra[index].setAttribute("style", "display:none;");
                descripcion[index].parentElement.parentElement.setAttribute("style", "opacity:0.4;");
            }

        }
        for (let index = 0; index < descripcion.length; index++) {
            if (descripcion[index].innerText == "prueba") {
                console.log(descripcion[index].parentElement.parentElement.parentElement);
                descripcion[index].parentElement.parentElement.parentElement.styles="display:none";
                index--;
            }
        }
    }
    getJSON("*");
    busqueda.addEventListener("input", function (e) {
        getJSON(busqueda.value);
    })
    busqueda.addEventListener("click", function () {
        busqueda.value = "";
    })


}