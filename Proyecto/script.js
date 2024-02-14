// Prototipo Alumno
function Alumno(nombre, apellidos, edad) {
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.edad = edad;
    this.materias = []; // Inicializar como un array vacío
    this.calificaciones = {}; // Inicializar como un objeto vacío
}

// Arreglo de Alumnos
let alumnos = [];

// Función para agregar un alumno
function agregarAlumno() {
    let nombre = document.getElementById('nombre').value;
    let apellidos = document.getElementById('apellidos').value;
    let edad = document.getElementById('edad').value;

    // Obtener los valores de materia y calificacion de elementos HTML
    let materia = document.getElementById('materia').value;
    let calificacion = document.getElementById('calificacion').value;

    // Obtener el alumno existente o crear uno nuevo si no existe
    let alumno = alumnos.find(alumno => alumno.nombre === nombre && alumno.apellidos === apellidos && alumno.edad === edad);
    if (!alumno) {
        alumno = new Alumno(nombre, apellidos, edad);
        alumnos.push(alumno);
    }

    // Agregar la materia y calificacion al alumno
    alumno.materias.push(materia);
    alumno.calificaciones[materia] = calificacion;

    // Actualizar el almacenamiento local y mostrar los alumnos
    localStorage.setItem('alumnos', JSON.stringify(alumnos));
    mostrarAlumnos();
}

// Función para mostrar la lista de alumnos
function mostrarAlumnos() {
    let alumnosListDiv = document.getElementById('alumno-list');
    alumnosListDiv.innerHTML = '<h2>Lista de Alumnos</h2>';
    
    for (let i = 0; i < alumnos.length; i++) {
        let alumno = alumnos[i];
        let alumnoDiv = document.createElement('div');
        alumnoDiv.textContent = `${alumno.nombre} ${alumno.apellidos}, Edad: ${alumno.edad}, Materias: ${alumno.materias.join(', ')}, Calificaciones: ${JSON.stringify(alumno.calificaciones)}`;
        alumnosListDiv.appendChild(alumnoDiv);
    }
}

// Inicialización y carga de datos desde LocalStorage
window.onload = function() {
    alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];
    mostrarAlumnos();
};



// Otras funciones como buscarAlumno, cargar desde LocalStorage, etc.



/*function buscarAlumno() {
    let searchTerm = document.getElementById('search-input').value.toLowerCase();
    let searchResultsDiv = document.getElementById('search-results');
    searchResultsDiv.innerHTML = ''; // Limpiamos los resultados anteriores

    alumnos.forEach(function(alumno) {
        let nombreCompleto = alumno.nombre.toLowerCase() + ' ' + alumno.apellidos.toLowerCase();
        if (nombreCompleto.includes(searchTerm)) {
            var resultDiv = document.createElement('div');
            resultDiv.textContent =  alumno.nombre + ' ' + alumno.apellidos ;
            searchResultsDiv.appendChild(resultDiv);
        }
    });
}

*/