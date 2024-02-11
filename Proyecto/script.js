// Prototipo Alumno
function Alumno(nombre, apellidos, edad) {
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.edad = edad;
    this.materias = [];
    this.calificacion = {};
}

// Arreglo de Alumnos
var alumnos = [];

// Función para agregar un alumno
function agregarAlumno() {
    let nombre = document.getElementById('nombre').value;
    let apellidos = document.getElementById('apellidos').value;
    let edad = document.getElementById('edad').value;

    let alumno = new Alumno(nombre, apellidos, edad, calificacion);
    alumnos.push(alumno);
    localStorage.setItem('alumnos', JSON.stringify(alumnos));

    mostrarAlumnos();
}

// Función para mostrar la lista de alumnos
function mostrarAlumnos() {
    let alumnosListDiv = document.getElementById('alumno-list');
    alumnosListDiv.innerHTML = '<h2>Lista de Alumnos</h2>';
    
    for (let i = 0; i < alumnos.length; i++) {
        var alumnoDiv = document.createElement('div');
        alumnoDiv.textContent = alumnos[i].nombre + ' ' + alumnos[i].apellidos + ', Edad: ' + alumnos[i].edad + alumnos[i].calificacion ;
        alumnosListDiv.appendChild(alumnoDiv);
    }
}

// Inicialización y carga de datos desde LocalStorage
window.onload = function() {
    alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];
    mostrarAlumnos();
};

