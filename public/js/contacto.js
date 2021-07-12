//Variables
const formulario = document.querySelector('#enviar-mail');
const btnEnviar = document.querySelector('#enviar');
const nombre = document.querySelector('#nombre');
const direccion = document.querySelector('#direccion');
const telefono = document.querySelector('#telefono');
const email = document.querySelector('#email');
const mensaje = document.querySelector('#mensaje');
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

cargarEventosContacto()
function cargarEventosContacto() {
    document.addEventListener('DOMContentLoaded', iniciarApp);
    nombre.addEventListener('blur', validarFormulario);
    direccion.addEventListener('blur', validarFormulario);
    telefono.addEventListener('blur', validarFormulario);
    email.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);
    formulario.addEventListener('submit', enviarEmail);
}


//Funciones
function iniciarApp() {
    btnEnviar.disabled = true;
}

function validarFormulario(e) {

    if (e.target.value.length > 0) {
        const error = document.querySelector('p.error');
        if (error) {
            error.remove();
        }
        e.target.style.borderColor = 'green';

    } else {
        e.target.style.borderColor = 'red';
        mostrarError('Todos los campos son obligatorios');
    }

    if (e.target.type === 'email') {
        if (er.test(e.target.value)) {
            const error = document.querySelector('p.error');
            if (error) {
                error.remove();
            }
            e.target.style.borderColor = 'green';
        } else {
            e.target.style.borderColor = 'red';
            mostrarError('Email no valido');
        }
    }
    if (er.test(email.value) && nombre.value !== '' && mensaje.value !== '') {
        btnEnviar.disabled = false;

    }
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.style.backgroundColor = 'red';
    mensajeError.style.color = 'white';
    mensajeError.style.padding = "1.5rem"
    mensajeError.style.fontSize = '2rem';
    mensajeError.style.textAlign = 'center';
    mensajeError.classList.add('error');
    const errores = document.querySelectorAll('.error');

    if (errores.length === 0) {
        formulario.appendChild(mensajeError);
    }

}


function enviarEmail(e) {
    e.preventDefault();
    e.target.nombre.value = "";
    e.target.direccion.value = "";
    e.target.telefono.value = "";
    e.target.email.value = "";
}