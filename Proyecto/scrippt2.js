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

    // Crear un nuevo alumno con los valores obtenidos
    let alumno = new Alumno(nombre, apellidos, edad, materia, calificacion);
    alumnos.push(alumno);

    // Limpiar los campos de entrada
    document.getElementById('nombre').value = '';
    document.getElementById('apellidos').value = '';
    document.getElementById('edad').value = '';
    document.getElementById('materia').value = '';
    document.getElementById('calificacion').value = '';

    mostrarAlumnos();
}

// Función para mostrar la lista de alumnos
function mostrarAlumnos() {
    let alumnosList = document.getElementById('alumno-list');
    alumnosList.innerHTML = '';

    for (let i = 0; i < alumnos.length; i++) {
        let alumnoItem = document.createElement('li');
        alumnoItem.textContent = `${alumnos[i].nombre} ${alumnos[i].apellidos} - Edad: ${alumnos[i].edad}, Materia: ${alumnos[i].materia}, Calificación: ${alumnos[i].calificacion}`;
        alumnosList.appendChild(alumnoItem);
    }
}
