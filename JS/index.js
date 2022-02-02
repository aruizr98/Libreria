window.addEventListener("load", iniciar);
function iniciar() {
    var busqueda=document.getElementById("busqueda");
    busqueda.addEventListener("input",function(e){
        e.preventDefault();
        getJSON(busqueda.value);
    })
    busqueda.addEventListener("click", function(){
        busqueda.value="";
    })
    var portadas = document.getElementsByClassName("portada");
    var descripcion = document.getElementsByClassName("card-text");
    function getJSON(libro) {
        var xhr = new XMLHttpRequest(); //Se crea el objeto
        xhr.open("GET", "https://www.googleapis.com/books/v1/volumes?q="+libro, true); //Abrir una petición
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
        console.log("portadas: "+portadas.length);
        console.log("Descripción: "+descripcion.length);
        console.log(libros);
        //document.getElementById("foto").setAttribute("src",jsonDoc.items[1].volumeInfo.imageLinks.smallThumbnail );

        // if(libros.length < portadas.length){
        //     console.log(libros.length);
        //     console.log(libros);
        //     console.log(portadas.length);
        //     for (let index = 0; index < (portadas.length-libros.length); index++) {
               
                
        //     }
        // }
        for (let index = 0; index < libros.length; index++) {
            
            portadas[index].setAttribute("src", libros[index].volumeInfo.imageLinks.thumbnail);
            descripcion[index].innerText = libros[index].volumeInfo.description;
        }
        for (let index = 0; index < descripcion.length; index++) {
            if(descripcion[index].innerText=="prueba"){
                console.log(descripcion[index].parentElement.parentElement.parentElement);
                descripcion[index].parentElement.parentElement.parentElement.remove();
                index--;
            }
         }
    }
    getJSON("*");
    

}