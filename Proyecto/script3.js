function Alumno(nombre, apellidos, fechaNacimiento) {
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.fechaNacimiento = fechaNacimiento;  
    this.materias = [];
    this.calificaciones = {};
    this.grupo = "";
}


let alumnos = JSON.parse(localStorage.getItem('alumnos')) || [];

function agregarAlumno() {
    let nombre = document.getElementById('nombre').value;
    let apellidos = document.getElementById('apellidos').value;
    let fechaNacimiento = document.getElementById('fechaNacimiento').value;

    if (!nombre || !apellidos || !fechaNacimiento) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    let grupo = prompt('Ingrese el grupo (A o B):').toUpperCase();

    if (!grupo || (grupo !== 'A' && grupo !== 'B')) {
        alert('Por favor, ingrese un grupo válido (A o B).');
        return;
    }

    let alumno = new Alumno(nombre, apellidos, fechaNacimiento);
    alumno.grupo = grupo;  // Asigna el grupo directamente al crear el alumno
    alumnos.push(alumno);

    localStorage.setItem('alumnos', JSON.stringify(alumnos));

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
    while (indiceUltimoAlumno >= 0 && (!alumnos[indiceUltimoAlumno].nombre || !alumnos[indiceUltimoAlumno].apellidos)) {
        indiceUltimoAlumno--;
    }

    if (indiceUltimoAlumno >= 0) {
        
        if (!alumnos[indiceUltimoAlumno].materias.includes(materia)) {
            alumnos[indiceUltimoAlumno].materias.push(materia);
            alumnos[indiceUltimoAlumno].calificaciones[materia] = calificacion;
            mostrarAlumnos();
        } else {
            alert("La materia ya está asignada a este alumno.");
        }
    } else {
        alert("Agregue un alumno primero antes de asignar materias y calificaciones.");
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
    alumnos.sort((a, b) => {
        const nombreA = `${a.nombre} ${a.apellidos}`.toUpperCase();
        const nombreB = `${b.nombre} ${b.apellidos}`.toUpperCase();
        return nombreA.localeCompare(nombreB);
    });
}

function mostrarAlumnos(alumnosMostrar = alumnos) {
    sortAlumnos();
    let alumnosList = document.getElementById('alumno-list');
    alumnosList.innerHTML = '';

    for (let i = 0; i < alumnosMostrar.length; i++) {
        let alumnoItem = document.createElement('li');
        alumnoItem.innerHTML = `
            <strong>${alumnosMostrar[i].nombre} ${alumnosMostrar[i].apellidos}</strong><br>
            Fecha de Cumpleaños: ${alumnosMostrar[i].fechaNacimiento}<br> <!-- Nueva línea -->
            Materias y Calificaciones:<br>${generarListaMateriasCalificaciones(alumnosMostrar[i].materias.sort(), alumnosMostrar[i].calificaciones)}<br>
            Grupo: ${alumnosMostrar[i].grupo}<br>
            Promedio Total: ${obtenerPromedioTotalAlumno(alumnosMostrar[i])}
        `;
        alumnoItem.appendChild(crearBotonModificar(i));
        alumnoItem.appendChild(crearBotonModificarMaterias(i));
        alumnoItem.appendChild(crearBotonDarDeBaja(i));
        alumnoItem.appendChild(crearBotonAgregarMateria(i));
        alumnosList.appendChild(alumnoItem);
    }

    calcularPromedioPorGrupo();
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

            localStorage.setItem('alumnos', JSON.stringify(alumnos));

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

        localStorage.setItem('alumnos', JSON.stringify(alumnos));

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

                let indexMateria = alumnos[indice].materias.indexOf(materiaExistente);
                alumnos[indice].materias[indexMateria] = nuevaMateria;
                alumnos[indice].calificaciones[nuevaMateria] = alumnos[indice].calificaciones[materiaExistente];
                delete alumnos[indice].calificaciones[materiaExistente];

                localStorage.setItem('alumnos', JSON.stringify(alumnos));

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



function crearBotonDarDeBaja(indice) {
    let boton = document.createElement('button');
    boton.textContent = "Dar de Baja";
    boton.onclick = function () {
        darDeBajaAlumno(indice);
    };
    return boton;
}

function crearBotonAgregarMateria(indice) {
    let boton = document.createElement('button');
    boton.textContent = "Agregar Materia";
    boton.onclick = function () {
        agregarMateriaAlumno(indice);
    };
    return boton;
}

function agregarMateriaAlumno(indice) {
    let materia = prompt("Ingrese el nombre de la materia:");
    let calificacion = prompt(`Ingrese la calificación para ${materia}:`);

    if (materia && calificacion && !isNaN(parseFloat(calificacion))) {
        alumnos[indice].materias.push(materia);
        alumnos[indice].calificaciones[materia] = calificacion;

        localStorage.setItem('alumnos', JSON.stringify(alumnos));

        mostrarAlumnos();
    } else {
        alert("Por favor, ingrese datos válidos.");
    }
}

function crearBotonDarDeBaja(indice) {
    let boton = document.createElement('button');
    boton.textContent = "Dar de Baja";
    boton.className = "boton-rojo"; 
    boton.onclick = function () {
        darDeBajaAlumno(indice);
    };
    return boton;
}


function cargarAlumnosDesdeLocalStorage() {
    const alumnosGuardados = localStorage.getItem('alumnos');
    if (alumnosGuardados) {
        alumnos = JSON.parse(alumnosGuardados);
        mostrarAlumnos();
    }
}

cargarAlumnosDesdeLocalStorage();

function guardarAlumnosEnLocalStorage() {
    localStorage.setItem('alumnos', JSON.stringify(alumnos));
}

function darDeBajaAlumno(indice) {
    let confirmarBaja = confirm("¿Está seguro de dar de baja a este alumno?");
    if (confirmarBaja) {

        alumnos.splice(indice, 1);
        mostrarAlumnos();
        guardarAlumnosEnLocalStorage();
    }
}

function toggleFormulario() {
    let formulario = document.getElementById('formulario-alta');
    formulario.style.display = formulario.style.display === 'none' ? 'block' : 'none';
}

function filtrarAlumnos() {
    let inputBusqueda = document.getElementById('busqueda').value.toLowerCase();
    let alumnosFiltrados = alumnos.filter(alumno => {
        let nombreCompleto = `${alumno.nombre} ${alumno.apellidos}`.toLowerCase();
        return nombreCompleto.includes(inputBusqueda);
    });

    mostrarAlumnos(alumnosFiltrados);
}

function calcularPromedioPorGrupo() {
    let grupos = {};

   
    for (let alumno of alumnos) {
        if (alumno.grupo) {
            if (!grupos[alumno.grupo]) {
                grupos[alumno.grupo] = [];
            }
            grupos[alumno.grupo].push(alumno);
        }
    }

  
    let promedioGruposHTML = '<ul>';
    for (let grupo in grupos) {
        let promedioGrupo = calcularPromedioGrupo(grupos[grupo]);
        promedioGruposHTML += `<li>Promedio Grupo ${grupo}: ${promedioGrupo.toFixed(2)}</li>`;
    }
    promedioGruposHTML += '</ul>';

    
    document.getElementById('promedio-grupos').innerHTML = promedioGruposHTML;
}

function calcularPromedioGrupo(alumnosGrupo) {
    let totalCalificaciones = 0;
    let totalMaterias = 0;

    for (let alumno of alumnosGrupo) {
        let calificaciones = Object.values(alumno.calificaciones);
        totalCalificaciones += calificaciones.reduce((total, calificacion) => total + parseFloat(calificacion), 0);
        totalMaterias += calificaciones.length;
    }

    if (totalMaterias > 0) {
        return totalCalificaciones / totalMaterias;
    } else {
        return 0;
    }
}


