window.addEventListener("load", iniciar);

function iniciar() {
    var libroInfo = localStorage.getItem("libroInfo");
    var portada = document.getElementById("portada");
    var titulo = document.getElementById("titulo");
    var autor = document.getElementById("autor");
    var descripcion = document.getElementById("descripcion");
    var isbn = document.getElementById("ISBN");
    var editorial = document.getElementById("editorial");
    var fechaPublicacion = document.getElementById("fechaPublicacion");
    var idioma = document.getElementById("idioma");
    var numeroPaginas = document.getElementById("numeroPaginas");
    var formatos = document.getElementById("formatos");
    var libros = JSON.parse(sessionStorage.getItem("resultado"));
    var botones = document.getElementsByClassName("boton");
    if (localStorage.getItem("cesta") != null) {
        var cesta = JSON.parse(localStorage.getItem("cesta"));
    } else {
        var cesta = new Array();
    }
    console.log(libroInfo);
    console.log(libros);
    var encontrado = false;
    var contador=0;
    for (let index = 0; index < libros.length; index++) {
        contador=0;
        if (libros[index].volumeInfo.description == libroInfo) {
            encontrado = true;
            portada.setAttribute("src", libros[index].volumeInfo.imageLinks.thumbnail);
            titulo.innerText = libros[index].volumeInfo.title;
            if (libros[index].volumeInfo.authors != undefined) {
                autor.innerText = libros[index].volumeInfo.authors[0];
            }
            descripcion.innerText = libros[index].volumeInfo.description;
            // if(libros[index].volumeInfo.industryIdentifiers.length <1){
            // isbn.innerHTML="<strong>ISBN: </strong>"+libros[index].volumeInfo.industryIdentifiers[1].identifier;
            // }
            if(libros[index].volumeInfo.printType=="MAGAZINE"){
                for (let index = 0; index < botones.length; index++) {
                    botones[index].setAttribute("style", "display:none;");
                }
            }
            if (libros[index].volumeInfo.industryIdentifiers != undefined) {
                isbn.innerHTML += "<strong>Identificador: </strong><br/>";
                isbn.innerHTML += "<ul>";
                for (let j = 0; j < libros[index].volumeInfo.industryIdentifiers.length; j++) {
                    console.log(libros[index].volumeInfo.industryIdentifiers[0])

                    isbn.innerHTML += "<li><strong>" + libros[index].volumeInfo.industryIdentifiers[j].type + ": </strong>" + libros[index].volumeInfo.industryIdentifiers[j].identifier + "</li>";

                }
                isbn.innerHTML += "</ul>";
            }
            if (libros[index].volumeInfo.pageCount != undefined) {
                numeroPaginas.innerHTML = "<strong>Número de páginas</strong>: " + libros[index].volumeInfo.pageCount;
            }
            if (libros[index].volumeInfo.publisher != undefined) {
                editorial.innerHTML = "<strong>Editorial: </strong>: " + libros[index].volumeInfo.publisher;
            }
            if(libros[index].volumeInfo.publishedDate != undefined){
            fechaPublicacion.innerHTML = "<strong>Fecha de publicación: </strong>" + libros[index].volumeInfo.publishedDate;
            }
         
            if(libros[index] != undefined){
                if(libros[index].saleInfo.saleability == "FOR_SALE"){
            if (libros[index].accessInfo.epub.isAvailable || libros[index].accessInfo.pdf.isAvailable) {
                formatos.innerHTML += "<strong>Formatos disponibles</strong>:";
                if (libros[index].accessInfo.epub.isAvailable == true) {
                    formatos.innerHTML += " Epub";
                }
                if (libros[index].accessInfo.pdf.isAvailable == true) {
                    formatos.innerHTML += " PDF ";
                }
            }else{
                for (let index = 0; index < botones.length; index++) {
                    botones[index].setAttribute("style", "display:none;");
                }
            }
            if (libros[index].volumeInfo.language == "es") {
                if(contador==0){
                idioma.innerHTML += "<strong>Idioma: </strong> Español";
                }
                contador++;
                //index=libros.length;
            } else if (libros[index].volumeInfo.language == "en") {
                if(contador==0){
                idioma.innerHTML += "<strong>Idioma: </strong> Inglés";
                }
                contador++;
               // index=libros.length;
            }
        }else{
            for (let index = 0; index < botones.length; index++) {
                botones[index].setAttribute("style", "display:none;");
            }
        }
           
        }
            // if (!libros[index].accessInfo.epub.isAvailable && !libros[index].accessInfo.pdf.isAvailable) {
            //     formatos.innerHTML += " Lo sentimos. Este libro no está disponible en ningún formato en este momento.";

            //     console.log(botones);
                
            // }
            preguntar();
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
            function agregarACesta(descripcion) {
                var titulo;
                var contador = 0;
                for (let index = 0; index < libros.length; index++) {
                    if (libros[index].volumeInfo.description == descripcion) { // A partir de la descripción, se obtiene el objeto completo de ese libro
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


                localStorage.setItem("cesta", JSON.stringify(cesta));
                console.log(cesta);

            }
            function evitarDuplicados(array) {

                for (let index = 0; index < array.length - 1; index++) {
                    console.log(array[index].id + " " + array[index + 1].id);
                    if (array[index].id == array[index + 1].id) {//Si el id de un libro coincide con el del siguiente
                        array.splice(index + 1, 1);//Se borra
                    }
                }
            }
            for (let h = 0; h < botones.length; h++) {
                botones[h].addEventListener("click", function () {
                    if (botones[h].innerText == "Comprar") {

                        var descripcion = this.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
                        agregarACesta(descripcion);
                        location.href = "cesta.html";
                    } else if (botones[h].innerText == "Añadir al carrito") {
                        var descripcion = this.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
                        agregarACesta(descripcion);
                        console.log("AGREGADO")
                    } else {
                        location.href = libros[index].accessInfo.webReaderLink;
                    }
                })

            }

        }

    }
    if (!encontrado) {

    }
}