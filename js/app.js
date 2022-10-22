//Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const notificacion = document.querySelector('.numerito');
// console.log(notificacion);
let articulosCarrito = [];


//Listeners
cargarEventListeners();

function cargarEventListeners() {

    //Cuando agregas un curso presionando "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina un curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        // console.log('Vaciando carrito...')
        articulosCarrito = []; // reseteamos el array
        limpiarHTML(); //Eliminamos todo el HTML
    });
}


//Funciones 


function agregarCurso(e) {
    e.preventDefault();
    //console.log('Presionando en cursos');
    //console.log(e.target.classList);
    //Delegation para agregar-carrito
    if (e.target.classList.contains("agregar-carrito")) {
        //console.log("Agregando al carrito...");
        // console.log(e.target);
        // console.log(e.target.parentElement.parentElement);
        //solo se activa si presionamos boton azul
        const cursoSeleccionado = e.target.parentElement.parentElement;
        //Enviamos el curso seleccionado para tomar sus datos
        leerDatosCurso(cursoSeleccionado);
    }
}
// Lee los datos del curso
//Lee el contenido del HTML al que le dimos click 
//y extrae la informacion del curso
function leerDatosCurso(curso) {
    // console.log(curso);

    //Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    // console.log(infoCurso);

    //Revisa si un elemento ya existe en el carrito

    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    // console.log(existe);
    if (existe) {
        //actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; //retorna el objeto actualizado

            } else {
                return curso; // retorna los objetos que no son los duplicados
            }

        })
        articulosCarrito = [...cursos];
    } else {
        //Agregamos el curso al carrito
        //Agregar elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];

    }
    // console.log(articulosCarrito);

    carritoHTML();
    calcular();
}

//Elimina un curso del carrito
// Elimina el curso del carrito en el DOM
function eliminarCurso(e) {
    // console.log('desde eliminar Curso');
    // console.log(e.target.classList);
    // e.preventDefault();
    if (e.target.classList.contains('borrar-curso')) {
        // console.log(e.target.getAttribute('data-id'));
        //e.target.parentElement.parentElement.remove();
        const cursoId = e.target.getAttribute('data-id')

        //Eliminar del Array de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        //console.log(articulosCarrito);
        carritoHTML(); // Iterar sobre el carrito y mostrar su HTML
    }
    notificacion.innerHTML = articulosCarrito.length;
    // console.log(articulosCarrito);
}

// Muestra el carrito de compras en el HTML
//Muestra el curso seleccionado en el Carrito
function carritoHTML() {
    // Limpiar el HTML
    limpiarHTML();

    // Recorre el carrito y genera el HTML

    articulosCarrito.forEach(curso => {
        // console.log(curso);
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
        `;
        // Agrega del HTML del carrito en tbody
        contenedorCarrito.appendChild(row);
    });

}
// Elimina los cursos del tbody en el DOM
function limpiarHTML() {
    //Forma Lenta
    // contenedorCarrito.innerHTML = '';

    //Forma Recomendada
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

}

// function actualizar() {
//     // let buscar = articulosCarrito.find((x) => x.cantidad === cantidad)
//     // document.getElementById(notificacion).innerHTML = buscar.cantidad;
//     // calcular();
//     notificacion.innerHTML = articulosCarrito
//         .map((x) => x.cantidad)
//         .reduce((x, y) => x - y)

// }

function calcular() {
    // console.log("desde actualizar");
    notificacion.innerHTML = articulosCarrito
        .map((x) => x.cantidad)
        .reduce((x, y) => x + y, 0)
};


