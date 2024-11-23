var gridComponents;
var btn_vaciar;

function cargarInventario(){
    gridComponents = document.getElementsByClassName("grid-componentes");
    let componente;
    let tipoClase;

    for(let gridElement of gridComponents){
        switch(gridElement.id){
            case "grid-graficas": 
                componente = inventario.graficas; 
                tipoClase = "graficas"
                break;
            case "grid-procesadores":
                componente = inventario.procesadores;
                tipoClase = "procesadores"
                break;
            case "grid-rams":
                componente = inventario.ram;
                tipoClase = "ram"
                break;
            case "grid-placas":
                componente = inventario.placas;
                tipoClase = "placas"
                break;
            case "grid-discos":
                componente = inventario.discos;
                tipoClase = "discos"
                break;
            case "grid-fuentes":
                componente = inventario.fuentes;
                tipoClase = "fuentes"
                break;
            default: console.log("No se reconoce el ID");
        }

        cargarComponente(gridElement, componente, tipoClase);
    }

    btn_vaciar = document.getElementById("vaciar-cesta");
}

function cargarComponente(gridContainer, componentes, tipoClase){
    for(let componente of componentes){
        let htmlComponent = `
            <div class="componente ${tipoClase}" id="${componente.id}" draggable="true">
                <img src="${componente.imagen}" alt="${componente.nombre}" draggable="false">
                <div class="components-data">
                    <p>${componente.nombre}</p>
                    <p>${componente.precio}€</p>
                </div>
            </div>
        `;
        gridContainer.insertAdjacentHTML("beforeend", htmlComponent);
    }
}

//Eventos de inicio
document.addEventListener('DOMContentLoaded', cargarInventario);