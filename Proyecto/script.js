// Clase Alumno
class Alumno {
    constructor(nombre, apellidos, edad) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.edad = edad;
        this.materias = [];
        this.calificaciones = [];
    }

    inscribirMateria(materia) {
        this.materias.push(materia);
        this.calificaciones.push(null); // inicializamos con null
    }

    asignarCalificacion(materia, calificacion) {
        const index = this.materias.indexOf(materia);
        if (index !== -1) {
            this.calificaciones[index] = calificacion;
        }
    }

    obtenerPromedio() {
        let sum = 0;
        let count = 0;
        for (let calificacion of this.calificaciones) {
            if (calificacion !== null) {
                sum += calificacion;
                count++;
            }
        }
        return count > 0 ? sum / count : 0;
    }
}

// Función para agregar un alumno
function agregarAlumno(event) {
    event.preventDefault();
    const nombre = document.getElementById('name').value;
    const apellidos = document.getElementById('lastName').value;
    const edad = document.getElementById('age').value;
    const nuevoAlumno = new Alumno(nombre, apellidos, edad);
    alumnos.push(nuevoAlumno);
    localStorage.setItem('alumnos', JSON.stringify(alumnos));
    mostrarAlumnos();
    event.target.reset();
}

// Función para mostrar la lista de alumnos
function mostrarAlumnos() {
    const studentList = document.getElementById('student-list');
    studentList.innerHTML = '';
    for (let alumno of alumnos) {
        const studentDiv = document.createElement('div');
        studentDiv.textContent = `${alumno.nombre} ${alumno.apellidos} - Edad: ${alumno.edad}`;
        studentList.appendChild(studentDiv);
    }
}

// Inicialización
const alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];
mostrarAlumnos();
document.getElementById('add-student-form').addEventListener('submit', agregarAlumno);
