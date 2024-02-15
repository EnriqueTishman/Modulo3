function Alumno(nombre, apellidos) {
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.materias = [];
    this.calificaciones = {};
    this.grupo = "";
}

let alumnos = [];

function agregarAlumno() {
    let nombre = document.getElementById('nombre').value;
    let apellidos = document.getElementById('apellidos').value;

    if (!nombre || !apellidos) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    let alumno = new Alumno(nombre, apellidos);
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

function obtenerPromedioTotalAlumno(alumno) {
    let calificaciones = Object.values(alumno.calificaciones);
    if (calificaciones.length > 0) {
        let promedio = calificaciones.reduce((total, calificacion) => total + parseFloat(calificacion), 0) / calificaciones.length;
        return promedio.toFixed(2);
    } else {
        return "N/A";
    }
}

function sortAlumnos() {
    // Ordenar alumnos alfabéticamente por nombre y apellidos
    alumnos.sort((a, b) => {
        const nombreA = `${a.nombre} ${a.apellidos}`.toUpperCase();
        const nombreB = `${b.nombre} ${b.apellidos}`.toUpperCase();
        return nombreA.localeCompare(nombreB);
    });
}

function mostrarAlumnos(alumnosMostrar = alumnos) {
    sortAlumnos(); // Ordenar alumnos antes de mostrar
    let alumnosList = document.getElementById('alumno-list');
    alumnosList.innerHTML = ''; // Limpiar la lista antes de mostrar

    for (let i = 0; i < alumnosMostrar.length; i++) {
        let alumnoItem = document.createElement('li');
        alumnoItem.innerHTML = `
            <strong>${alumnosMostrar[i].nombre} ${alumnosMostrar[i].apellidos}</strong><br>
            Materias y Calificaciones:<br>${generarListaMateriasCalificaciones(alumnosMostrar[i].materias.sort(), alumnosMostrar[i].calificaciones)}<br>
            Grupo: ${alumnosMostrar[i].grupo}<br>
            Promedio Total: ${obtenerPromedioTotalAlumno(alumnosMostrar[i])}
        `;
        alumnoItem.appendChild(crearBotonModificar(i));
        alumnoItem.appendChild(crearBotonModificarMaterias(i)); // Nuevo botón para modificar materias
        alumnosList.appendChild(alumnoItem);
    }
}

function crearBotonModificar(indice) {
    let boton = document.createElement('button');
    boton.textContent = "Modificar Calificación";
    boton.onclick = function () {
        modificarCalificacion(indice);
    };
    return boton;
}

function crearBotonModificarMaterias(indice) {
    let boton = document.createElement('button');
    boton.textContent = "Modificar Materias";
    boton.onclick = function () {
        modificarMateriasAlumnoExistente(indice);
    };
    return boton;
}

function modificarCalificacion(indice) {
    let materia = prompt("Ingrese el nombre de la materia:");
    if (materia && alumnos[indice].materias.includes(materia)) {
        let nuevaCalificacion = prompt(`Ingrese la nueva calificación para ${materia}:`);
        if (!isNaN(parseFloat(nuevaCalificacion))) {
            alumnos[indice].calificaciones[materia] = nuevaCalificacion;
            mostrarAlumnos();
        } else {
            alert("Por favor, ingrese una calificación válida.");
        }
    } else {
        alert("Materia no encontrada o no asignada a este alumno.");
    }
}

function agregarMateriaAlumnoExistente(indice) {
    let materia = prompt("Ingrese el nombre de la materia:");
    let calificacion = prompt(`Ingrese la calificación para ${materia}:`);

    if (materia && calificacion && !isNaN(parseFloat(calificacion))) {
        alumnos[indice].materias.push(materia);
        alumnos[indice].calificaciones[materia] = calificacion;
        mostrarAlumnos();
    } else {
        alert("Por favor, ingrese datos válidos.");
    }
}

function modificarMateriasAlumnoExistente(indice) {
    let opcion = prompt("Seleccione una opción:\n1. Agregar nueva materia\n2. Modificar materia existente");
    
    if (opcion === "1") {
        agregarMateriaAlumnoExistente(indice);
    } else if (opcion === "2") {
        let materiaExistente = prompt("Ingrese el nombre de la materia existente que desea modificar:");
        if (materiaExistente && alumnos[indice].materias.includes(materiaExistente)) {
            let nuevaMateria = prompt(`Ingrese el nuevo nombre para ${materiaExistente}:`);
            if (nuevaMateria) {
                // Modificar la materia en la lista y en las calificaciones
                let indexMateria = alumnos[indice].materias.indexOf(materiaExistente);
                alumnos[indice].materias[indexMateria] = nuevaMateria;
                alumnos[indice].calificaciones[nuevaMateria] = alumnos[indice].calificaciones[materiaExistente];
                delete alumnos[indice].calificaciones[materiaExistente];
                mostrarAlumnos();
            } else {
                alert("Por favor, ingrese un nombre válido para la nueva materia.");
            }
        } else {
            alert("Materia no encontrada o no asignada a este alumno.");
        }
    } else {
        alert("Opción no válida.");
    }
}

function generarListaMateriasCalificaciones(materias, calificaciones) {
    let listaMateriasCalificaciones = '<ol>';
    for (let materia of materias) {
        let calificacion = calificaciones[materia] || "N/A";
        listaMateriasCalificaciones += `<ul>${materia}: ${calificacion}</ul>`;
    }
    listaMateriasCalificaciones += '</ol>';
    return listaMateriasCalificaciones;
}
