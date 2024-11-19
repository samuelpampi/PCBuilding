var gridComponents;

function cargarInventario(){
    gridComponents = document.getElementsByClassName("grid-componentes");
    let componente;

    for(let gridElement of gridComponents){
        switch(gridElement.id){
            case "grid-graficas": componente = inventario.graficas; break;
            case "grid-procesadores": componente = inventario.procesadores; break;
            case "grid-rams": componente = inventario.ram; break;
            case "grid-placas": componente = inventario.placas; break;
            case "grid-discos": componente = inventario.discos; break;
            case "grid-fuentes": componente = inventario.fuentes; break;
            default: console.log("No se reconoce el ID");
        }

        cargarComponente(gridElement, componente);
    }
}

function cargarComponente(gridContainer, componentes){
    for(let componente of componentes){
        let htmlComponent = `
            <div class="componente" id="${componente.id}">
                <img src="${componente.imagen}" alt="${componente.nombre}">
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