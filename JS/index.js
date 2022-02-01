window.addEventListener("load", iniciar);
function iniciar(){
    var portadas=document.getElementsByClassName("portada");
    var descripcion=document.getElementsByClassName("card-text");
    function getJSON() {
        var xhr = new XMLHttpRequest(); //Se crea el objeto
        xhr.open("GET", "https://www.googleapis.com/books/v1/volumes?q=*", true); //Abrir una petición
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
        // for (let index = 0; index < jsonDoc["@graph"].length; index++) {
        //    caja.innerHTML+="<strong>"+jsonDoc["@graph"][index]["title"]+"</strong>: "+jsonDoc["@graph"][index]["event-location"]+"<br/>";                    
        // }
        console.log(jsonDoc);
        // console.log(jsonDoc.items[1].volumeInfo.imageLinks.smallThumbnail);
        console.log(jsonDoc.items[1].volumeInfo.description);
        //document.getElementById("foto").setAttribute("src",jsonDoc.items[1].volumeInfo.imageLinks.smallThumbnail );

        for (let index = 0; index < jsonDoc.items.length; index++) {
          portadas[index].setAttribute("src", jsonDoc.items[index].volumeInfo.imageLinks.smallThumbnail);
            descripcion[index].innerText=jsonDoc.items[index].volumeInfo.description;
        }
    }
    getJSON();
}