var cesta;
var btn_vaciar;
var selectedComponent = {};
var precio = 0;
var precioItem;

function cargarEventos(){
    btn_vaciar = document.getElementById("vaciar-cesta");
    cesta = document.getElementById("cesta");

    btn_vaciar.addEventListener("click", vaciarCesta);
    actualizarPrecio();

    //Seleccionar todos los elementos "componente" para el Drag & Drop
    document.querySelectorAll(".componente").forEach((componente) => {
        componente.addEventListener("dragstart", (event) => {
            //Obtener la clase adicional que indica el tipo
            let clases = componente.classList; //Lista de clases
            let selectedComponentType = [...clases].find((clase) => clase !== "componente"); //Filtramos para excluir "componente"

            selectedComponent = {
                type: selectedComponentType,
                id: componente.id
            }

            console.log("Arrastrando:", {selectedComponent}); //Debug
        });
    });

    //Habilitamos el Drop en la cesta
    cesta.addEventListener("dragover", event => {
        event.preventDefault();
    })

    cesta.addEventListener("drop", event => {
        //Insertar elemento en la cesta
        insertarCesta(event);

        //Actualizar precio
        actualizarPrecio();

        //Crear eventos para boton de eliminar
        agregarEventosEliminar();

    });
}

function vaciarCesta(){
    cesta.innerHTML = "";
    precio = 0;
    actualizarPrecio();
}

function actualizarPrecio(){
    precioItem = document.getElementById("precio");
    precioItem.innerText = `${precio}€`;
}

function insertarCesta(event){
    //Desestructuramos el selectedComponent
    let {type, id} = selectedComponent;
    let component = inventario[type].find(componente => componente.id == id); //Extraemos el componente del inventario con toda su info
    let cestaElement = `<div class="cesta-componente ${type}" id="cesta-${component.id}">
                            <img src="${component.imagen}" alt="${component.id}">
                            <div class="nombre">
                                <div class="grid-model"><p>${component.nombre}</p></div>
                                <div class="grid-price"><p>${component.precio}€</p></div>
                                <div id="delete-${component.id}" class="grid-trash"><i class="fa-solid fa-trash"></i></div>
                            </div>
                        </div>`;

    cesta.insertAdjacentHTML("beforeend", cestaElement);

    //Actualizar precio
    precio += parseFloat(component.precio);
}

function agregarEventosEliminar(){
    //Crear eventos para boton de eliminar
    document.querySelectorAll(".grid-trash").forEach((componenteCesta) => {
        componenteCesta.addEventListener("click", e => {
            let componenteId = e.target.closest(".cesta-componente").id; //Cogemos el primer ancestro de la papelera que coincida con la clase especifica, es decir el objeto completo, y sacamos su id para poder eliminarlo

            //Eliminamos el componente de la cesta
            let componente = document.getElementById(componenteId);
            if (componente){
                //Actualizar el precio
                let precioComponente = parseFloat(componente.querySelector(".grid-price p").innerText.replace("€", "")); //Recuperamos el precio, eliminando el simbolo €
                precio -= precioComponente;

                componente.remove();
                actualizarPrecio();
            }
        });
    });
}

//Eventos de inicio
document.addEventListener('DOMContentLoaded', cargarEventos);