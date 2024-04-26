class Vuelo {
    constructor(origen, destino, costoBase) {
        this.origen = origen;  // Punto de partida del vuelo.
        this.destino = destino;  // Punto de llegada del vuelo.
        this.costoBase = costoBase;  // Costo inicial del tiquete antes de impuestos y descuentos.
        this.impuesto = 0;  // El impuesto que se aplicará, específico del destino.
        this.pasajeros = [];  // Lista de pasajeros en el vuelo.
        this.vuelosEnPromocion = false;  // Indica si el vuelo tiene promoción.
    }

    // Método para agregar pasajeros al vuelo.
    agregarPasajero(pasajero) {
        this.pasajeros.push(pasajero);
    }

    // Método para calcular el costo total recaudado por el vuelo, aplicando impuestos y descuentos si el vuelo está en promoción.
    calcularCostoTiquete() {
        let totalRecaudado = 0;
        for (let i = 0; i < this.pasajeros.length; i++) {
            let costo = this.costoBase;
            if (this.vuelosEnPromocion) {
                costo *= 0.9; // Descuento del 10% en promoción.
            }
            costo += costo * (this.impuesto / 100); // Aplicar el impuesto.
            totalRecaudado += costo;
        }
        return totalRecaudado;
    }
}
// Clase Pasajero representa a un pasajero individual, abstrayendo detalles como la edad y si lleva mascota.
class Pasajero {
    constructor(edad, llevaMascota) {
        this.edad = edad;  // Edad del pasajero.
        this.llevaMascota = llevaMascota;  // Indica si el pasajero viaja con una mascota
    }

    // Método para determinar si el pasajero es un infante (12 años o menos).
    esInfante() {
        return this.edad <= 12;
    }
}
// Clase SistemaReservas gestiona múltiples vuelos y proporciona métodos para calcular ingresos y estadísticas.
class SistemaReservas {
    constructor() {
        this.vuelos = [];  // Lista de todos los vuelos gestionados por el sistema.
    }

    // Método para agregar un vuelo al sistema de reservas.
    agregarVuelo(vuelo) {
        this.vuelos.push(vuelo);
    }

    // Método para calcular el total de ingresos generados por todos los vuelos.
    calcularIngresosTotales() {
        let total = 0;
        for (let i = 0; i < this.vuelos.length; i++) {
            total += this.vuelos[i].calcularCostoTiquete();
        }
        return total;
    }

    // Método para calcular los ingresos generados por el transporte de mascotas.
    calcularIngresosMascotas() {
        let ingresosMascotas = 0;
        for (let i = 0; i < this.vuelos.length; i++) {
            for (let j = 0; j < this.vuelos[i].pasajeros.length; j++) {
                if (this.vuelos[i].pasajeros[j].llevaMascota) {
                    let costoMascota = this.vuelos[i].costoBase * (this.vuelos[i].impuesto / 100);
                    ingresosMascotas += costoMascota;
                }
            }
        }
        return ingresosMascotas;
    }

    // Método para contar el número total de infantes que han viajado en todos los vuelos.
    contarInfantes() {
        let contador = 0;
        for (let i = 0; i < this.vuelos.length; i++) {
            for (let j = 0; j < this.vuelos[i].pasajeros.length; j++) {
                if (this.vuelos[i].pasajeros[j].esInfante()) {
                    contador++;
                }
            }
        }
        return contador;
    }
}
const readlineSync = require('readline-sync');

let sistemaReservas = new SistemaReservas();
let costoDulces = 10; // Supongamos que cada dulce cuesta $10

let continuar = 's';
while (continuar === 's') {
    let origen = readlineSync.question('\nIngrese la ciudad de origen: ');
    let destino = readlineSync.question('Ingrese la ciudad de destino: ');
    let costoBase = +readlineSync.question('Ingrese el valor del vuelo (sin impuesto): ');
    let impuesto = +readlineSync.question(`Ingrese el impuesto para la ciudad ${destino} (%): `);

    let vuelo = new Vuelo(origen, destino, costoBase);
    vuelo.impuesto = impuesto;
    vuelo.vuelosEnPromocion = readlineSync.question('\n¿El vuelo está en promoción? (s/n): ') === 's';

    let agregarPasajeros = 's';
    while (agregarPasajeros === 's') {
        let edad = +readlineSync.question('\nIngrese la edad del pasajero: ');
        let llevaMascota = readlineSync.question('¿El pasajero va a viajar con su mascota? (s/n): ') === 's';
        let pasajero = new Pasajero(edad, llevaMascota);
        vuelo.agregarPasajero(pasajero);
        agregarPasajeros = readlineSync.question('¿Desea agregar otro pasajero al vuelo? (s/n): ');
    }

    sistemaReservas.agregarVuelo(vuelo);
    continuar = readlineSync.question('¿Desea agregar otro vuelo? (s/n): ');
}

console.info(`\nIngresos totales por venta de tiquetes: $${sistemaReservas.calcularIngresosTotales()}`);
console.info(`Dinero recaudado por transporte de mascotas: $${sistemaReservas.calcularIngresosMascotas()}`);
console.info(`Número de infantes que han viajado: ${sistemaReservas.contarInfantes()}`);
console.info(`Número de mascotas que han viajado: ${sistemaReservas.contarMascotas()}`);
console.info(`Costo total de dulces para infantes: $${(sistemaReservas.contarInfantes() * costoDulces)}\n`);