var cesta;
var btn_vaciar;
var selectedComponent = {};
var deletedComponent =  {};
var componentesSection;
var precio = 0;
var precioItem;

function cargarEventos(){
    btn_vaciar = document.getElementById("vaciar-cesta");
    cesta = document.getElementById("cesta");
    componentesSection = document.getElementById("section-componentes");

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
    });

    componentesSection.addEventListener("dragover", event =>{
        event.preventDefault();
    });

    componentesSection.addEventListener("drop", event => {
        if(deletedComponent){
            let componente = deletedComponent;
            if (componente){
                //Actualizar el precio
                let precioComponente = parseFloat(componente.querySelector(".grid-price p").innerText.replace("€", "")); //Recuperamos el precio, eliminando el simbolo €
                console.log("Precio: " + precioComponente);
                precio -= precioComponente;

                componente.remove();
                actualizarPrecio();
            }
        }

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
    let componentId = `cesta-${component.id}-${Date.now()}`; //Creamos un id que sea unico
    let cestaElement = `<div class="cesta-componente ${type}" id="${componentId}" draggable="true">
                            <img src="${component.imagen}" alt="${component.id}" draggable="false">
                            <div class="nombre">
                                <div class="grid-model"><p>${component.nombre}</p></div>
                                <div class="grid-price"><p>${component.precio}€</p></div>
                                <div id="delete-${componentId}" class="grid-trash"><i class="fa-solid fa-trash"></i></div>
                            </div>
                        </div>`;

    cesta.insertAdjacentHTML("beforeend", cestaElement);

    //Actualizar precio
    precio += parseFloat(component.precio);

    //Agregamos eventos para eliminar el elemento de la cesta

    //Evento Drag & Drop
    let newComponent = document.getElementById(componentId);
    newComponent.addEventListener("dragstart", event => {
        deletedComponent = event.target
        console.log("Borrando: ", {deletedComponent});
    });

    //Eventos boton eliminar
    let deleteButton = newComponent.querySelector(`#delete-${componentId}`);
    deleteButton.addEventListener("click", event => {
        let componente = document.getElementById(componentId);
        if (componente) {
            // Actualizar el precio total
            let precioComponente = parseFloat(componente.querySelector(".grid-price p").innerText.replace("€", ""));
            precio -= precioComponente;

            // Eliminar el componente de la cesta
            componente.remove();
            actualizarPrecio();
        }
    });

}

//Eventos de inicio
document.addEventListener('DOMContentLoaded', cargarEventos);