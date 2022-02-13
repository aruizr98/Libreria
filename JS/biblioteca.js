window.addEventListener("load", iniciar);

function iniciar() {
    var usuarios = JSON.parse(localStorage.getItem("usuarios"));
    var bibliotecas = JSON.parse(localStorage.getItem("bibliotecaUsuarios"));
    var contenedorLibros = document.getElementById("libros");
    var biblioteca = document.getElementById("biblioteca");
    var autores = new Array();
    var filtradoPorAutor = document.getElementById("filtradoPorAutor");
    var generos = new Array();
    var filtradoPorGenero = document.getElementById("filtradoPorGenero");
    var botonTodosAutores = document.getElementById("todosAutores");
    var botonTodosGeneros = document.getElementById("todosGeneros");

    biblioteca.innerText = "Biblioteca de " + localStorage.getItem("nombreUsuario");
    function eliminarLibros(array) {
        for (let index = 0; index < array.length; index++) {
            array.splice(index, 1);
            index--;

        }
    }
    function agregarLibros(libros) {
        for (libro in libros) {
            //  console.log(libros[libro]);
            // let contenedor = document.createElement("div");
            // contenedor.classList = "row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3";
            // contenedor.id = "libro";

            let col = document.createElement("div");
            col.classList = "col float-right";


            let tarjeta = document.createElement("div");
            tarjeta.classList = "card shadow-sm";
            col.append(tarjeta);

            let imagen = document.createElement("img");
            imagen.classList = "portada";
            tarjeta.append(imagen);

            let cardBody = document.createElement("div");
            cardBody.classList = "card-body";
            tarjeta.append(cardBody);

            let titulo = document.createElement("h3");
            titulo.classList = "titulo";
            cardBody.append(titulo);

            let autor = document.createElement("h5");
            autor.classList = "autor";
            cardBody.append(autor);

            let hr = document.createElement("hr");
            cardBody.append(hr);

            let descripcion = document.createElement("p");
            descripcion.classList = "card-text";
            descripcion.setAttribute("style", "height:200px; overflow: scroll;");
            descripcion.setAttribute("src", "height:200px; overflow: scroll;");
            cardBody.append(descripcion);

            let caja = document.createElement("div");
            caja.classList = "d-flex justify-content-between align-items-center";
            cardBody.append(caja);

            let botonesComprar = document.createElement("div");
            botonesComprar.classList = "btn-group comprar";
            caja.append(botonesComprar);

            let botonDescargar = document.createElement("button");
            botonDescargar.classList = "btn btn-sm btn-outline-secondary botonComprar";
            botonDescargar.setAttribute("type", "button");
            botonDescargar.innerText = "Descargar";
            botonesComprar.append(botonDescargar);

            titulo.innerText = libros[libro].volumeInfo.title;
            autor.innerText = libros[libro].volumeInfo.authors[0];
            descripcion.innerText = libros[libro].volumeInfo.description;
            imagen.setAttribute("src", libros[libro].volumeInfo.imageLinks.thumbnail);
            contenedorLibros.appendChild(col);

        }
    }
    function ocultarLibros(array) {
        for (let index = 0; index < array.length; index++) {
            array[index].setAttribute("style", "display:none;");
        }
    }
    function mostrarLibros(array) {
        for (let index = 0; index < array.length; index++) {
            array[index].setAttribute("style", "display:'';");
        }
    }

    for (let index = 0; index < usuarios.length; index++) {
        if (localStorage.getItem("nombreUsuario") == usuarios[index].nombre) {
            let contador = 0;
            for (let j = 0; j < bibliotecas[index].length; j++) {

                for (let i = 0; i < bibliotecas[index].length; i++) {

                    if (bibliotecas[index][j].volumeInfo.description == bibliotecas[index][i].volumeInfo.description) {

                        contador++;
                        if (contador == 2) {
                            console.log("REPETIDO");
                            bibliotecas[index].splice(j, 1);
                            i = bibliotecas[index].length;
                        }
                    }

                }
                contador = 0;
            }

            agregarLibros(bibliotecas[index]);
            var tamanyoReal=contenedorLibros.children.length;
            for (let j = 0; j < bibliotecas[index].length; j++) {
                autores.push(bibliotecas[index][j].volumeInfo.authors[0]);
                generos.push(bibliotecas[index][j].volumeInfo.categories[0]);
                eliminarDuplicados(autores);
                eliminarDuplicados(generos);

            }
            for (let j = 0; j < autores.length; j++) {
                let input = document.createElement("input");
                var resultado = new Array();
                let todos = new Array();
                input.setAttribute("type", "radio");
                input.setAttribute("id", autores[j]);
                input.setAttribute("name", "autores");
                input.addEventListener("click", function () {
                    resultado = new Array();
                    for (let j = 0; j < bibliotecas[index].length; j++) {
                        if (bibliotecas[index][j].volumeInfo.authors [0] == this.id) {//Si el libro no es de la categoría seleccionada
                            //    bibliotecas[index].splice(j, 1);//Se elimina del array
                            //    j--;
                            resultado.push(bibliotecas[index][j]);
                            todos.push(bibliotecas[index][j]);
                        } else {
                            todos.push(bibliotecas[index][j]);
                        }

                    }
                    // console.log(resultado);
                    // console.log(todos);
                    eliminarLibros(todos);
                    ocultarLibros(contenedorLibros.children);
                    agregarLibros(resultado);
                   

                })
                botonTodosAutores.addEventListener("click", function () {
                    // mostrarLibros(contenedorLibros.children);
                 
                    for (let index = 0; index < contenedorLibros.children.length; index++) {
                        if(index < tamanyoReal){
                        contenedorLibros.children[index].setAttribute("style", "display:''");//Se meustran los libros que estaban ocultos
                        }else{
                            contenedorLibros.children[index].setAttribute("style", "display:none"); //Y se ocultan los resultados, si es que los había
                        }
                        
                    }
                })
                filtradoPorAutor.append(input);
                filtradoPorAutor.append(autores[j] + "\n");
                filtradoPorAutor.append(document.createElement("br"));
            }
            for (let j = 0; j < generos.length; j++) {
                var resultado = new Array();
                let input = document.createElement("input");
                let todos = new Array();
                input.setAttribute("type", "radio");
                input.setAttribute("id", generos[j]);
                input.setAttribute("name", "generos");
                input.addEventListener("click", function () {
                    resultado = new Array();
                    for (let j = 0; j < bibliotecas[index].length; j++) {
                        if (bibliotecas[index][j].volumeInfo.categories[0] == this.id) {//Si el libro no es de la categoría seleccionada
                            //    bibliotecas[index].splice(j, 1);//Se elimina del array
                            //    j--;
                            resultado.push(bibliotecas[index][j]);
                            todos.push(bibliotecas[index][j]);
                        } else {
                            todos.push(bibliotecas[index][j]);
                        }

                    }
                    // console.log(resultado);
                    // console.log(todos);
                    eliminarLibros(todos);
                    ocultarLibros(contenedorLibros.children);
                    agregarLibros(resultado);
                   

                })
                botonTodosGeneros.addEventListener("click", function () {
                    // mostrarLibros(contenedorLibros.children);
                 
                    for (let index = 0; index < contenedorLibros.children.length; index++) {
                        if(index < tamanyoReal){
                        contenedorLibros.children[index].setAttribute("style", "display:''");//Se meustran los libros que estaban ocultos
                        }else{
                            contenedorLibros.children[index].setAttribute("style", "display:none"); //Y se ocultan los resultados, si es que los había
                        }
                        
                    }
                })
                filtradoPorGenero.append(input);
                filtradoPorGenero.append(generos[j] + "\n");
                filtradoPorGenero.append(document.createElement("br"));
            }

            function eliminarDuplicados(array) {
                let contador = 0;
                for (var index = 0; index < array.length; index++) {
                    contador = 0;
                    for (let j = 0; j < array.length; j++) {
                        if (array[index] == array[j]) {
                            contador++;
                            if (contador > 1) {
                                array.splice(index, 1);
                            }

                        }

                    }

                }
            }
        }

    }

}