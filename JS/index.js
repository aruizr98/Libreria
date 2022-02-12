window.addEventListener("load", iniciar);

function iniciar() {
    var busqueda = document.getElementById("busqueda");
    var portadas = document.getElementsByClassName("portada");
    var descripcion = document.getElementsByClassName("card-text");
    var titulos = document.getElementsByClassName("titulo");
    var autores = document.getElementsByClassName("autor");
    var precios = document.getElementsByClassName("precio");
    var ofertas = document.getElementsByClassName("oferta");
    var botonesCompra = document.getElementsByClassName("comprar");
    var conectadoComo = document.getElementById("conectadoComo");
    var botonIniciarSesion = document.getElementById("botoniniciarSesion");
    var botonRegistrarse = document.getElementById("botonRegistrarse");
    var botonCerrarSesion = document.getElementById("botonCerrarSesion");
    var botonCarrito = document.getElementById("carrito");
    var limite;
    var imagenesCarrousel = document.getElementsByClassName("imagenCarrousel");
    var leerMas = document.getElementsByClassName("leerMas");
    var agregarCesta = document.getElementsByClassName("agregarCesta");
    var comprar = document.getElementsByClassName("botonComprar");
    var cesta = new Array();
    var numeroCompras = document.getElementById("numeroCompras");
    console.log(agregarCesta);

    function getJSON(libro) {
        var xhr = new XMLHttpRequest(); //Se crea el objeto
        xhr.open("GET", "https://www.googleapis.com/books/v1/volumes?q=" + libro, true); //Abrir una petición
        xhr.onreadystatechange = function () { //función callback
            if (this.readyState == 4 && //para cuando se 
                this.status == 200) { //reciba la respuesta
                procesarJSON(this);
                if (libro == "*") {
                    mostrarLibros(this);
                }
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
            sessionStorage.setItem("resultado", JSON.stringify(libros));
            //Se añade la portada, la sinopsis y el título de cada libro
            portadas[index].setAttribute("src", libros[index].volumeInfo.imageLinks.thumbnail);
            portadas[index].setAttribute("style", "cursor:pointer;");
            descripcion[index].innerText = libros[index].volumeInfo.description;
            titulos[index].innerText = libros[index].volumeInfo.title;
            autores[index].innerText = libros[index].volumeInfo.authors[0];

            if (libros[index].saleInfo.saleability == "FOR_SALE") {
                /*
                Si el libro está a la venta, se muestra el precio y los botones de compra
                */
                precios[index].innerText = libros[index].saleInfo.listPrice.amount + "€";
                precios[index].setAttribute("style", "cursor:default");
                botonesCompra[index].setAttribute("style", "display:block;");
                descripcion[index].parentElement.parentElement.setAttribute("style", "opacity:1;");
                ofertas[index].setAttribute("style", "cursor:default");

                if (libros[index].saleInfo.retailPrice.amount < libros[index].saleInfo.listPrice.amount) {
                    /*
                    Si el libro tiene oferta, se tachará el precio sin oferta y se mostrará a su lado el nuevo precio
                    */
                    //    console.log(precios[index].parentElement.parentElement.parentElement.parentElement.parentElement);
                    //    precios[index].parentElement.parentElement.parentElement.parentElement.setAttribute("style", "background-color:lightblue");
                    precios[index].classList = "btn btn-success precio text-decoration-line-through";
                    precios[index].setAttribute("style", "cursor:default; opacity:0.5;");
                    ofertas[index].innerText = libros[index].saleInfo.retailPrice.amount + "€";
                    ofertas[index].classList = "oferta btn btn-warning";


                } else { //Si no tiene oferta, se deja todo como estaba para que en futuras búsquedas no de información errónea
                    precios[index].classList = "btn btn-success precio";
                    precios[index].setAttribute("style", "cursor:default;opacity:1;");
                    ofertas[index].innerText = "";
                    ofertas[index].classList = "oferta";
                }
            } else {
                /*Si no está a la venta el libro aparecerá con baja opacidad,
                 se eliminan los botones de compra y en lugar del precio 
                 se muestra que el producto no está disponible
                */
                precios[index].classList = "precio";
                ofertas[index].innerText = "";
                ofertas[index].classList = "oferta";
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
        /**
         * Muestra imágenes en el carrousel
         */
        // for (let index = 0; index < imagenesCarrousel.length; index++) {
        //     imagenesCarrousel[index].src=libros[index].volumeInfo.imageLinks.thumbnail;

        // }    


        function agregarACesta(descripcion) {
            var titulo;
            var contador = 0;
            for (let index = 0; index < libros.length; index++) {
                if (libros[index].volumeInfo.description == descripcion.innerText) { // A partir de la descripción, se obtiene el objeto completo de ese libro
                    titulo = libros[index].volumeInfo.title;
                    cesta.push(libros[index]); // Y se añade a la cesta
                    for (let index = 0; index < cesta.length; index++) {
                        if (cesta[index].volumeInfo.title == titulo) {
                            contador++;
                        }

                    }
                    evitarDuplicados(cesta); // Se eliminan los posibles duplicados
                    // mostrarNotificacion(descripcion.previousElementSibling.previousElementSibling.previousElementSibling.innerText);
                    //mostrarNotificacion(libros[index].volumeInfo.title);

                }

            }
            if (titulo != undefined && contador == 1) {
                mostrarNotificacion(titulo);
            }

            numeroCompras.innerText = cesta.length;
            localStorage.setItem("cesta", JSON.stringify(cesta));
            console.log(cesta);

        }
        /**
         * Añadir libros a la cesta.
         * Se añaden los libros a los que se ha hecho click en 
         * "añadir al carrito"
         */
        for (let index = 0; index < agregarCesta.length; index++) {
            agregarCesta[index].addEventListener("click", function () {
                var descripcion = this.parentElement.parentElement.previousElementSibling;
                agregarACesta(descripcion);
                console.log("AGREGADO")
                // mostrarNotificacion(this.parentElement.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText);
            })
        }
        for (let index = 0; index < comprar.length; index++) {
            comprar[index].addEventListener("click", function () {
                var descripcion = this.parentElement.parentElement.previousElementSibling;

                // for (var l = 0; l < JSON.parse(localStorage.getItem("usuarios")).length; l++) {

                //     if (JSON.parse(localStorage.getItem("usuarios"))[l].nombre == localStorage.getItem("nombreUsuario")) {
                        
                //         if (JSON.parse(localStorage.getItem("cesta")) != null) {
                //             for (var j = 0; j < JSON.parse(localStorage.getItem("cesta")).length; j++) {

                //                 for (let i = 0; i < JSON.parse(localStorage.getItem("bibliotecaUsuarios"))[l].length; i++) {

                //                     if (JSON.parse(localStorage.getItem("cesta"))[j].volumeInfo.description == JSON.parse(localStorage.getItem("bibliotecaUsuarios"))[l][i].volumeInfo.description) {
                //                         localStorage.removeItem("cesta");
                //                         alert("Atención. El libro " + JSON.parse(localStorage.getItem("cesta"))[j].volumeInfo.title + " ya está en tu biblioteca. Se vaciará de la cesta.");

                //                         location.href = "cesta.html";




                //                     }

                //                 }

                //             }
                //         }
                //         l=JSON.parse(localStorage.getItem("usuarios")).length;
                //     }

                // }



                agregarACesta(descripcion);
                location.href = "cesta.html";




            })

        }
    }
    /**
     * Muestra los libros en el carrousel
     */
    function mostrarLibros(xhr) {
        var jsonDoc = JSON.parse(xhr.responseText);
        var libros = new Array();
        /*Obtener solamente los libros que tienen descripción y portada
         para que no aparezca undefined en la descripción en caso de no tenerla.
        */
        for (let index = 0; index < jsonDoc.items.length; index++) {
            if (jsonDoc.items[index].volumeInfo.description != undefined && jsonDoc.items[index].volumeInfo.imageLinks != undefined) {
                libros.push(jsonDoc.items[index]);
            }
        }

        for (let index = 0; index < libros.length; index++) {
            imagenesCarrousel[index].src = libros[index].volumeInfo.imageLinks.thumbnail;

        }
    }
    function preguntar() {
        Notification.requestPermission()
    }
    function mostrarNotificacion(titulo) {
        if (Notification.permission == 'granted') {
            const notificacion = new Notification('Te notificamos...', {
                body: titulo + " añadido al carrito!"
            });

        }
    }
    preguntar();
    function cerrarSesion() {
        sessionStorage.setItem("conectado", "false");
        localStorage.setItem("conectado", "false");
        location.reload();
    }
    function muestraOculta(e) {
        // for (let index = 0; index < leerMas.length; index++) {
        //   if(leerMas[index].parentElement.parentElement.previousElementSibling.style.heigth=="200px" && leerMas[index].parentElement.parentElement.previousElementSibling.style.overflow=="hidden"){
        //       leerMas[index].innerText="Leer menos";
        //       leerMas[index].parentElement.parentElement.previousElementSibling.setAttribute("style", "");
        //   }

        // }

        if (e.target.parentElement.parentElement.previousElementSibling.style.overflow == "hidden") {
            console.log("aaaaaaaa");
            e.target.innerText = "Leer menos";
            e.target.parentElement.parentElement.previousElementSibling.setAttribute("style", "");
        } else {
            e.target.innerText = "Leer más";
            e.target.parentElement.parentElement.previousElementSibling.setAttribute("style", "height:200px; overflow: hidden;");
        }
    }
    /**
     * Evita los duplicados en el array de libros 
     * comparando el id de cada uno de ellos
     */
    function evitarDuplicados(array) {

        for (let index = 0; index < array.length - 1; index++) {
            console.log(array[index].id + " " + array[index + 1].id);
            if (array[index].id == array[index + 1].id) {//Si el id de un libro coincide con el del siguiente
                array.splice(index + 1, 1);//Se borra
            }
        }
    }
    for (let index = 0; index < leerMas.length; index++) {
        leerMas[index].addEventListener("click", muestraOculta);

    }
    getJSON("*");
    if (sessionStorage.getItem("conectado") == "true" || localStorage.getItem("conectado") == "true") {
        conectadoComo.firstElementChild.innerText = "Conectado como: " + localStorage.getItem("nombreUsuario");
        console.log(botonIniciarSesion);
        console.log(botonRegistrarse);
        botonIniciarSesion.setAttribute("style", "display:none;");
        botonRegistrarse.setAttribute("style", "display:none;");
        carrito.setAttribute("style", "float:right;");
        conectadoComo.setAttribute("style", "float:left;");
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

    carrito.addEventListener("click", function () {
        location.href = "cesta.html";
    })
    /**
     * Al pulsar sobre la portada de un libro, se guarda el nombre del libro en
     * el localStorage para, posteriormente, mostrarlo detalladamente.
     */
    for (let index = 0; index < portadas.length; index++) {
        portadas[index].addEventListener("click", function () {
            // console.log(this.nextElementSibling.children[0]);
            localStorage.setItem("libroInfo", this.nextElementSibling.children[3].innerText);
            console.log(this.nextElementSibling.children[3].innerText);
            location.href = "infoLibro.html";
        })

    }

}