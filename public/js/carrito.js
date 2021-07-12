//Variables
//const contenidoCompra = document.querySelector('#lista-compra tbody'); //ver de donde viene

const imgCarrito = document.querySelector('#img-carrito');
const carrito = document.querySelector('#carrito');
const contenidoCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const contenedorArticulos = document.querySelector('#contenedor-articulos');
const btnConfirmarCompra = document.querySelector('#confirmar-compra');
var totalCompra = document.querySelector('#total');

cargarEventosCarrito();
function cargarEventosCarrito() {
    imgCarrito.addEventListener('click', () => {
        preventDefault();
    })
    //Muestra los artículos del localStorage
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        CarritoHTML();
    })
    // boton  de Procesar Compra en articulos.html
    btnConfirmarCompra.addEventListener('click', () => {
        console.log('Gracias por su cmpra');
        location.href = "clientes.html";
    })
    //ecuchando el boton de agregar artículos
    contenedorArticulos.addEventListener('click', agregarArticulo);
    //ecuchando el boton de Eliminar artículos
    carrito.addEventListener('click', eliminarArticulo);
    //vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = localStorage.removeItem('carrito');
        totalCompra.textContent = 0;
        articulosCarrito = [];
        limpiaHTML();
    })
}

//Funciones
function agregarArticulo(e) {
    if (e.target.classList.contains('botonArticulo')) {
        const articuloSeleccionado = e.target.parentElement;
        leerDatosArticulos(articuloSeleccionado);
    }
}

function eliminarArticulo(e) {
    e.preventDefault();
    //Eliminar artiuclos del acrrito
    if (e.target.classList.contains('borrar-articulo')) {
        const articuloId = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter(artSelec => artSelec.id !== articuloId);
        CarritoHTML()
    }
}

function leerDatosArticulos(artSelec) {
    const infoArticulo = {
        imagen: artSelec.querySelector('.img-info').src,
        nombre: artSelec.querySelector('.texto_articulos').textContent,
        precio: artSelec.querySelector('.precio_articulos').textContent,
        id: artSelec.querySelector('a').textContent,
        cantidad: 1
    }

    //Controlar si el articulo ya existe
    const existe = articulosCarrito.some(artSelec => artSelec.id === infoArticulo.id)
    if (existe) {
        //Actualizo la cantidad
        const control = articulosCarrito.map(artSelec => {
            if (artSelec.id === infoArticulo.id) {
                artSelec.cantidad++;
                return artSelec;
            } else {
                return artSelec;
            }
        })
    } else {
        // Agrego elementos a mi carrito de compras con "Express Operator"    
        articulosCarrito = [...articulosCarrito, infoArticulo];

    }
    CarritoHTML()
}

// agragar el carrito al HTML
function CarritoHTML() {
    let total = 0;

    //limpiar el HTML
    limpiaHTML();

    //Agrega el HTML del carrito al tbody
    articulosCarrito.forEach(carrito => {
        const row = document.createElement('tr');
        total += parseFloat(carrito.precio);
        row.innerHTML = `
            <td><img src="${carrito.imagen}" width="150"></td>
            <td>${carrito.nombre}</td>
            <td>$ ${carrito.precio}</td>
            <td>${carrito.cantidad}</td>
            <td>
            <a href="#" class="borrar-articulo" data-id="${carrito.id}"> x </a>
            </td>
            
`;
        totalCompra.textContent = (`$ ${total.toFixed(2)}`);

        ;
        //agrego el HTML del carrito en el tdbody
        contenidoCarrito.appendChild(row);
    });
    //Agregar el carrito de compras al localStorage
    sincronizarStorage();

    //Desativar Boton compra
    if (contenidoCarrito.firstChild) {
        btnConfirmarCompra.disabled = false;
    } else {
        btnConfirmarCompra.disabled = true;
    }
}

function sincronizarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

//Elimina articulos del carrito
function limpiaHTML() {
    while (contenidoCarrito.firstChild) {
        contenidoCarrito.removeChild(contenidoCarrito.firstChild);
    }

}

