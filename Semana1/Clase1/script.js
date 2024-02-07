class Persona{
     constructor(nuevoContacto, nombre, apellido, telefono){
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
     }
    }

   let Persona = new persona ('Enrique', Tishman, '5565419011')
   persona.saludar();
   console.log('Nombre: $')


/*
   class Contacto {
    constructor(nombre, apellidos, telefono) {
      this.nombre = nombre;
      this.apellidos = apellidos;
      this.telefono = telefono;
    }
  }
  
  class ListaContactos {
    constructor() {
      this.contactos = [];
    }
  
    agregarContacto(contacto) {
      this.contactos.push(contacto);
    }
  
    buscarContactoPorNombre(nombre) {
      return this.contactos.find(contacto => contacto.nombre === nombre);
    }
  }
  
  // Ejemplo de uso:
  const lista = new ListaContactos();
  
  const contacto1 = new Contacto("Juan", "Pérez", "123456789");
  const contacto2 = new Contacto("María", "Gómez", "987654321");
  
  lista.agregarContacto(contacto1);
  lista.agregarContacto(contacto2);
  
  const nombreABuscar = "Juan";
  const contactoEncontrado = lista.buscarContactoPorNombre(nombreABuscar);
  
  if (contactoEncontrado) {
    console.log("Contacto encontrado:");
    console.log(contactoEncontrado);
  } else {
    console.log(`No se encontró un contacto con el nombre ${nombreABuscar}`);
  }
  */
 