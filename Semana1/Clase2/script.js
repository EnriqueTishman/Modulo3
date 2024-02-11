class Persona{

    constructor(nuevoNombre, edad, genero, peso){
        this.nombre = nuevoNombre;
        this.edad = edad;
        this.genero = genero;
        this.mejorAmigo = null;
        //this.mejorAmigo = [];
        this.peso = peso;
        this.mascota = [];
    }

    saludar(){
        // Codigo del metodo.
        console.log(`Hola, mi nombre es ${this.nombre}`);
    }

    platicar(interlocutor){
        console.log(`Hola ${interlocutor.nombre} mi nombre es ${this.nombre}`);
    }

    agregarMejorAmigo(persona){
        this.mejorAmigo = (persona);
        console.log(`Mi nombre es: ${this.nombre} y mi mejor amigo es: ${this.mejorAmigo.nombre}`);
        //console.log(`Mi nombre es ${this.nombre} y mis mejores amigos son ${this.mejorAmigo}`);
    }

    agregarMascota(mascota){
        this.mascota.push(mascota);
    }

    mostrarMascotas(){
        console.log(`Mi nombre es: ${this.nombre} y mis mascotas son:`);
        for(let i = 0; i <this.mascota.length; i++){
            console.log(`${this.mascota[i].nombre} Especie: ${this.mascota[i].especie}`);
        }
    }

}

class Mascota{
    constructor(nombre, especie){
        this.nombre = nombre;
        this.especie = especie;
    }
}

let persona1 = new Persona('Enrique' , 28, 'Masculino', 75 );
persona1.saludar();
console.log(`Nombre: ${persona1.nombre} Edad: ${persona1.edad} `)

let persona2 = new Persona('Carlos', 28, 'Masculino', 72 );
persona2.saludar();

let persona3 = new Persona(`Ivan`, 29, `Masculino`, 80);

persona1.platicar(persona2);

persona1.agregarMejorAmigo(persona2);

persona1.agregarMejorAmigo(persona3)

let mascota1 = new Mascota("Arya", "Gran Danes");
let mascota2 = new Mascota("Hanna", "Gran Danes");
let mascota3 = new Mascota("Misha", "Weimaraner")

persona1. agregarMascota(mascota1);
persona1. agregarMascota(mascota2);

persona1.mostrarMascotas();

persona2.agregarMascota(mascota3);
persona2.mostrarMascotas(mascota3);
