// Espera a que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener("DOMContentLoaded", () => {

    // Selecciona el elemento donde se mostrará la cantidad total de electrodomésticos en el resumen
    const resumenCantidad = document.querySelector(".cant-electro");

    // Selecciona el botón de cotizar
    const botonCotizar = document.querySelector("#btn-cotizar");

    // Selecciona el botón de borrar cotización
    const botonBorrar = document.querySelector("#btn-borrar-cotizacion");

    // Selecciona todos los botones que agregan electrodomésticos a la lista
    const botonesAgregar = document.querySelectorAll(".btn-agregar");

    // Obtiene la lista de electrodomésticos almacenada en localStorage o inicializa un array vacío si no hay datos
    let listaElectro = JSON.parse(localStorage.getItem("listaElectro")) || [];

    // Función para actualizar la cantidad total en el resumen de electrodomésticos
    function actualizarResumen() {
        // Calcula la cantidad total sumando las cantidades de todos los electrodomésticos en la lista
        let totalElectro = 0;
        listaElectro.forEach(item => {
            totalElectro += item.cantidad;
        });
        resumenCantidad.textContent = totalElectro;
    }

    // Función para agregar un electrodoméstico a la lista de cotización
    function agregarElectro(nombre, cantidad) {
        // Verifica si la cantidad es válida (mayor que 0)
        if (!cantidad || cantidad <= 0) {
            alert("Ingrese una cantidad válida");
            return;
        }

        // Busca si el electrodoméstico ya está en la lista
        let item = listaElectro.find((item) => item.nombre === nombre);

        if (item) {
            // Si el electrodoméstico ya existe, incrementa su cantidad
            item.cantidad += cantidad;
        } else {
            // Si no existe, lo agrega a la lista con la cantidad indicada
            listaElectro.push({ nombre, cantidad });
        }

        // Guarda la lista actualizada en localStorage
        localStorage.setItem("listaElectro", JSON.stringify(listaElectro));

        console.log(listaElectro)

        // Actualiza la cantidad en el resumen
        actualizarResumen();
    }

    // Agrega eventos a cada botón de "Agregar" para añadir electrodomésticos a la lista
    botonesAgregar.forEach((boton) => {
        boton.addEventListener("click", () => {
            // Obtiene el input asociado al botón (se asume que está justo antes del botón en el HTML)
            const input = boton.previousElementSibling;

            // Obtiene el nombre del electrodoméstico desde el atributo "name" del input
            const nombreElectro = input.name;

            // Convierte el valor del input a un número entero
            const cantidadElectro = parseInt(input.value);

            // Llama a la función para agregar el electrodoméstico a la lista
            agregarElectro(nombreElectro, cantidadElectro);

            // Limpia el input después de agregar
            input.value = "";
        });
    });

    /*
    // Evento para redirigir a la página de cotización si hay elementos en la lista
    botonCotizar.addEventListener("click", () => {
        if (listaElectro.length === 0) {
            alert("Agrega electrodomésticos antes de cotizar");
            return;
        }
        // Redirige a la página de cotización
        window.location.href = "cotizacion.html";
    });
    */

    // Evento para borrar la lista de cotización
    botonBorrar.addEventListener("click", () => {
        // Elimina la lista almacenada en localStorage
        localStorage.removeItem("listaElectro");

        // Vacía la lista en la memoria
        listaElectro = [];

        // Actualiza la cantidad mostrada en el resumen
        actualizarResumen();
    });

    // Llama a la función para actualizar el resumen al cargar la página
    actualizarResumen();
});