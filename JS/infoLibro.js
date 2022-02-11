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
    console.log(libroInfo);
    console.log(libros);
    var encontrado = false;
    for (let index = 0; index < libros.length; index++) {
        if (libros[index].volumeInfo.description == libroInfo) {
            encontrado = true;
            portada.setAttribute("src", libros[index].volumeInfo.imageLinks.thumbnail);
            titulo.innerText = libros[index].volumeInfo.title;
            autor.innerText = libros[index].volumeInfo.authors[0];
            descripcion.innerText = libros[index].volumeInfo.description;
            // if(libros[index].volumeInfo.industryIdentifiers.length <1){
            // isbn.innerHTML="<strong>ISBN: </strong>"+libros[index].volumeInfo.industryIdentifiers[1].identifier;
            // }
            isbn.innerHTML+="<strong>Identificador: </strong><br/>";
            isbn.innerHTML+="<ul>";
                for (let j = 0; j < libros[index].volumeInfo.industryIdentifiers.length; j++) {
                    console.log(libros[index].volumeInfo.industryIdentifiers[0])
                    
                    isbn.innerHTML += "<li><strong>" + libros[index].volumeInfo.industryIdentifiers[j].type + ": </strong>" + libros[index].volumeInfo.industryIdentifiers[j].identifier+"</li>";

                }
                isbn.innerHTML+="</ul>";
                if(libros[index].volumeInfo.pageCount !=undefined){
            numeroPaginas.innerHTML = "<strong>Número de páginas</strong>: " + libros[index].volumeInfo.pageCount;
                }
            if (libros[index].volumeInfo.publisher != undefined) {
                editorial.innerHTML = "<strong>Editorial: </strong>: " + libros[index].volumeInfo.publisher;
            }
            fechaPublicacion.innerHTML = "<strong>Fecha de publicación: </strong>" + libros[index].volumeInfo.publishedDate;
            if (libros[index].volumeInfo.language == "es") {
                idioma.innerHTML += "<strong>Idioma: </strong> Español";
            } else if (libros[index].volumeInfo.language == "en") {
                idioma.innerHTML += "<strong>Idioma: </strong> Inglés";
            }
            formatos.innerHTML += "<strong>Formatos disponibles</strong>:";
            if (libros[index].accessInfo.epub.isAvailable == true) {
                formatos.innerHTML += " Epub";
            }
            if (libros[index].accessInfo.pdf.isAvailable == true) {
                formatos.innerHTML += " PDF ";
            }
            if (!libros[index].accessInfo.epub.isAvailable && !libros[index].accessInfo.pdf.isAvailable) {
                formatos.innerHTML += " Lo sentimos. Este libro no está disponible en ningún formato en este momento.";
            }

        }

    }
    if (!encontrado) {

    }
}