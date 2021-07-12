
const datosTabla = [
    { id: 1, nombre: "ABROCHADORA DELI + BROCHE EXPLORA 2-12HJ 0220", precio: 162.55 },
    { id: 2, nombre: "ABROCHADORA DELI 10-15HJ E0254", precio: 162.55 },
    { id: 3, nombre: "ABROCHADORA DELI ESSENTIAL 10-15HJ E0238", precio: 183.60 },
    { id: 4, nombre: "ABROCHADORA DELI MINI EXPLORA 10-15HJ E0220F", precio: 120.95 },
    { id: 5, nombre: "ABROCHADORA DELI START CORTO 10-15HJ E0224", precio: 140.95 },
    { id: 6, nombre: "ABROCHADORA DELI START LARGO 10-15HJ E0260", precio: 140.95 },
    { id: 7, nombre: "ABROCHADORA DELI VIVID COMPAC 10-15HJ E0228", precio: 263.16 },
    { id: 8, nombre: "ABROCHADORA DINAMIT  21 MEZA PINTADA STANDAR", precio: 2325.86 },
    { id: 9, nombre: "ABROCHADORA DINAMIT  21 PINTADA PINZA", precio: 1365.70 },
    { id: 10, nombre: "ACRILICO ACUAREL  60ML AD550 CAUDAL", precio: 55.15 },
    { id: 11, nombre: "ACRILICO ACUAREL  60ML AD560 MAR DEL CARIBE", precio: 55.15 },
    { id: 12, nombre: "ACRILICO ACUAREL  60ML AD570 ROJO TEJA", precio: 55.15 },
    { id: 13, nombre: "ACRILICO ACUAREL  60ML AD60 CORAL", precio: 55.15 },
    { id: 14, nombre: "ACRILICO ACUAREL  60ML AD690 MARRON AFRICANO", precio: 55.15 },
    { id: 15, nombre: "ACRILICO ACUAREL  60ML AD90 ROJO FUEGO", precio: 55.15 },
    { id: 16, nombre: "ACRILICO ACUAREL  60ML AD900 AMARILLO", precio: 55.15 },

]

datosTabla.forEach(function (articulos) {
    //creacion del div "elementos"
    const divArticulo = document.createElement("div");
    divArticulo.classList.add("elemento");

    //creacion de los elementos del div
    const imgArticulo = document.createElement("img");
    imgArticulo.src = "./img/8.jpg";
    imgArticulo.classList.add("img-fluid", "img-info");

    const descrArticulo = document.createElement("p");
    descrArticulo.classList.add("texto_articulos");
    descrArticulo.textContent = articulos.nombre;
    const precioArticulo = document.createElement("p");
    precioArticulo.classList.add("texto_articulos", "precio_articulos");
    precioArticulo.textContent = articulos.precio;
    const idArticulo = document.createElement("a");
    idArticulo.textContent=articulos.id;
    const botonArticulo = document.createElement("button");
    botonArticulo.classList.add("btn", "btn-primary", "botonArticulo");
    botonArticulo.textContent = 'Agregar Carrito';


    //asignacion de los elementos al divArticulo
    divArticulo.appendChild(imgArticulo);
    divArticulo.appendChild(descrArticulo);
    divArticulo.appendChild(precioArticulo);
    divArticulo.appendChild(idArticulo);
    divArticulo.appendChild(botonArticulo);

    const articulo = document.querySelector(".grilla");
    articulo.appendChild(divArticulo);
    console.log(divArticulo);

})

