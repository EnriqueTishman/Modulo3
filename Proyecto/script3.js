function Alumno(nombre, apellidos, edad) {
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.edad = edad;
    this.materias = [];
    this.calificaciones = {};
    this.grupo = "";
}

let alumnos = [];

function agregarAlumno() {
    let nombre = document.getElementById('nombre').value;
    let apellidos = document.getElementById('apellidos').value;
    let edad = document.getElementById('edad').value;

    if (!nombre || !apellidos || !edad) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    let alumno = new Alumno(nombre, apellidos, edad);
    alumnos.push(alumno);
    mostrarAlumnos();
}

function agregarMateriaCalificacion() {
    let materia = document.getElementById('materia').value;
    let calificacion = document.getElementById('calificacion').value;

    if (!materia || !calificacion) {
        alert("Por favor, complete los campos de materia y calificación.");
        return;
    }

    let indiceUltimoAlumno = alumnos.length - 1;

    if (indiceUltimoAlumno >= 0) {
        alumnos[indiceUltimoAlumno].materias.push(materia);
        alumnos[indiceUltimoAlumno].calificaciones[materia] = calificacion;
        mostrarAlumnos();
    } else {
        alert("Agregue un alumno primero antes de asignar materias y calificaciones.");
    }
}

function agregarGrupo() {
    let grupo = document.getElementById('grupo').value;

    if (!grupo) {
        alert("Por favor, ingrese un grupo.");
        return;
    }

    let indiceUltimoAlumno = alumnos.length - 1;

    if (indiceUltimoAlumno >= 0) {
        alumnos[indiceUltimoAlumno].grupo = grupo;
        mostrarAlumnos();
    } else {
        alert("Agregue un alumno primero antes de asignar un grupo.");
    }
}

function mostrarAlumnos() {
    let alumnosList = document.getElementById('alumno-list');
    alumnosList.innerHTML = ''; // Limpiar la lista antes de mostrar

    for (let i = 0; i < alumnos.length; i++) {
        let alumnoItem = document.createElement('li');
        alumnoItem.innerHTML = `
            <strong>${alumnos[i].nombre} ${alumnos[i].apellidos}</strong><br>
            Edad: ${alumnos[i].edad}<br>
            Materias: ${alumnos[i].materias.join(', ')}<br>
            Calificaciones: ${JSON.stringify(alumnos[i].calificaciones)}<br>
            Grupo: ${alumnos[i].grupo}
        `;
        alumnosList.appendChild(alumnoItem);
    }
}
