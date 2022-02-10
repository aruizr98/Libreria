window.addEventListener("load", iniciar);

function iniciar() {
    var usuarios = JSON.parse(localStorage.getItem("usuarios"));
    var bibliotecas = JSON.parse(localStorage.getItem("bibliotecaUsuarios"));
    var contenedorLibros=document.getElementById("libros");
    var biblioteca=document.getElementById("biblioteca");

    biblioteca.innerText="Biblioteca de "+localStorage.getItem("nombreUsuario");
    for (let index = 0; index < usuarios.length; index++) {
        if (localStorage.getItem("nombreUsuario") == usuarios[index].nombre) {
            console.log(bibliotecas[index]);
            for (libros in bibliotecas[index]) {
                console.log(bibliotecas[index][libros]);
                // let contenedor = document.createElement("div");
                // contenedor.classList = "row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3";
                // contenedor.id = "libros";

                let col = document.createElement("div");
                col.classList = "col";
                

                let tarjeta = document.createElement("div");
                tarjeta.classList = "card shadow-sm";
                col.append(tarjeta);

                let imagen = document.createElement("img");
                imagen.classList = "portada";
                tarjeta.append(imagen);

                let cardBody = document.createElement("div");
                cardBody.classList = "card-body";
                tarjeta.append(cardBody);

                let titulo=document.createElement("h3");
                titulo.classList="titulo";
                cardBody.append(titulo);

                let autor=document.createElement("h5");
                autor.classList="autor";
                cardBody.append(autor);

                let hr=document.createElement("hr");
                cardBody.append(hr);

                let descripcion=document.createElement("p");
                descripcion.classList="card-text";
                descripcion.setAttribute("style", "height:200px; overflow: scroll;");
                descripcion.setAttribute("src", "height:200px; overflow: scroll;");
                cardBody.append(descripcion);

                let caja=document.createElement("div");
                caja.classList="d-flex justify-content-between align-items-center";
                cardBody.append(caja);

                let botonesComprar=document.createElement("div");
                botonesComprar.classList="btn-group comprar";
                caja.append(botonesComprar);

                let botonDescargar=document.createElement("button");
                botonDescargar.classList="btn btn-sm btn-outline-secondary botonComprar";
                botonDescargar.setAttribute("type", "button");
                botonDescargar.innerText="Descargar";
                botonesComprar.append(botonDescargar);

                titulo.innerText = bibliotecas[index][libros].volumeInfo.title;
                autor.innerText = bibliotecas[index][libros].volumeInfo.authors[0];
                descripcion.innerText = bibliotecas[index][libros].volumeInfo.description;
                imagen.setAttribute("src", bibliotecas[index][libros].volumeInfo.imageLinks.thumbnail);
                contenedorLibros.appendChild(col);

            }
        }

    }
}