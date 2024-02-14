// Prototipo Alumno
function Alumno(nombre, apellidos, edad, materia, calificacion) {
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.edad = edad;
    this.materia = materia;
    this.calificacion = calificacion;
}

// Arreglo de Alumnos
let alumnos = [];

// Función para agregar un alumno
function agregarAlumno() {
    let nombre = document.getElementById('nombre').value;
    let apellidos = document.getElementById('apellidos').value;
    let edad = document.getElementById('edad').value;
    let materia = document.getElementById('materia').value;
    let calificacion = document.getElementById('calificacion').value;

    let alumno = new Alumno(nombre, apellidos, edad, materia, calificacion);
    alumnos.push(alumno);
    localStorage.setItem('alumnos', JSON.stringify(alumnos));

    mostrarAlumnos();
}

// Función para mostrar la lista de alumnos
function mostrarAlumnos() {
    let alumnosList = document.getElementById('alumno-list');
    alumnosList.innerHTML = '';

    for (let i = 0; i < alumnos.length; i++) {
        let alumno = alumnos[i];
        let listItem = document.createElement('li');
        listItem.textContent = `${alumno.nombre} ${alumno.apellidos}, Edad: ${alumno.edad}, Materia: ${alumno.materia}, Calificación: ${alumno.calificacion}`;
        alumnosList.appendChild(listItem);
    }
}

// Función para buscar un alumno por nombre
function buscarAlumno() {
    let searchTerm = document.getElementById('search-input').value.toLowerCase();
    let filteredAlumnos = alumnos.filter(alumno => alumno.nombre.toLowerCase().includes(searchTerm) || alumno.apellidos.toLowerCase().includes(searchTerm));
    mostrarAlumnos(filteredAlumnos);
}

// Cargar datos de LocalStorage al cargar la página
window.onload = function() {
    alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];
    mostrarAlumnos();
};

// ...

// Función para buscar un alumno por nombre o apellidos
function buscarAlumno() {
    let searchTerm = document.getElementById('search-input').value.toLowerCase();
    let searchResultsDiv = document.getElementById('alumno-list');

    searchResultsDiv.innerHTML = ''; // Limpiamos los resultados anteriores

    let filteredAlumnos = alumnos.filter(function(alumno) {
        let nombreCompleto = alumno.nombre.toLowerCase() + ' ' + alumno.apellidos.toLowerCase();
        return nombreCompleto.includes(searchTerm);
    });

    for (let i = 0; i < filteredAlumnos.length; i++) {
        let alumno = filteredAlumnos[i];
        let alumnoDiv = document.createElement('div');
        alumnoDiv.textContent = `${alumno.nombre} ${alumno.apellidos}, Edad: ${alumno.edad}, Materias: ${alumno.materias.join(', ')}, Calificaciones: ${JSON.stringify(alumno.calificaciones)}`;
        searchResultsDiv.appendChild(alumnoDiv);
    }
}


 