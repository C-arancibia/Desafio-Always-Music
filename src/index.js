// src/index.js
import readline from 'readline';
import { agregarEstudiante, consultarEstudiantes, consultarEstudiantePorRut, actualizarEstudiante, eliminarEstudiante } from './queries';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function mostrarMenu() {
    console.log('--- Menú ---');
    console.log('1. Agregar nuevo estudiante');
    console.log('2. Consultar todos los estudiantes');
    console.log('3. Consultar estudiante por Rut');
    console.log('4. Actualizar información de estudiante');
    console.log('5. Eliminar estudiante');
    console.log('6. Salir');
    console.log('-------------');
}

rl.on('close', () => {
    console.log('Saliendo del programa...');
    process.exit(0);
});

async function iniciarPrograma() {
    mostrarMenu();

    rl.question('Seleccione una opción: ', async (opcion) => {
        switch (opcion) {
            case '1':
                await agregarNuevoEstudiante();
                break;
            case '2':
                await consultarTodosLosEstudiantes();
                break;
            case '3':
                await consultarEstudiantePorRut();
                break;
            case '4':
                await actualizarInformacionEstudiante();
                break;
            case '5':
                await eliminarEstudiante();
                break;
            case '6':
                rl.close();
                break;
            default:
                console.log('Opción no válida.');
                break;
        }
        iniciarPrograma(); // Volver a mostrar el menú después de cada operación
    });
}

async function agregarNuevoEstudiante() {
    try {
        const nombre = await pregunta('Ingrese el nombre del estudiante: ');
        const rut = await pregunta('Ingrese el rut del estudiante: ');
        const curso = await pregunta('Ingrese el curso del estudiante: ');
        const nivel = await pregunta('Ingrese el nivel del estudiante: ');

        const nuevoEstudiante = await agregarEstudiante(nombre, rut, curso, nivel);
        console.log('Estudiante agregado:', nuevoEstudiante);
    } catch (error) {
        console.error('Error al agregar estudiante:', error);
    }
}

async function consultarTodosLosEstudiantes() {
    try {
        const estudiantes = await consultarEstudiantes();
        console.log('Estudiantes registrados:');
        console.table(estudiantes);
    } catch (error) {
        console.error('Error al consultar estudiantes:', error);
    }
}

async function consultarEstudiantePorRut() {
    try {
        const rut = await pregunta('Ingrese el rut del estudiante a consultar: ');
        const estudiante = await consultarEstudiantePorRut(rut);
        console.log('Estudiante encontrado:');
        console.table(estudiante);
    } catch (error) {
        console.error('Error al consultar estudiante por rut:', error);
    }
}

async function actualizarInformacionEstudiante() {
    try {
        const id = await pregunta('Ingrese el ID del estudiante a actualizar: ');
        const nombre = await pregunta('Ingrese el nuevo nombre del estudiante: ');
        const rut = await pregunta('Ingrese el nuevo rut del estudiante: ');
        const curso = await pregunta('Ingrese el nuevo curso del estudiante: ');
        const nivel = await pregunta('Ingrese el nuevo nivel del estudiante: ');

        const estudianteActualizado = await actualizarEstudiante(id, nombre, rut, curso, nivel);
        console.log('Estudiante actualizado:', estudianteActualizado);
    } catch (error) {
        console.error('Error al actualizar estudiante:', error);
    }
}

async function eliminarEstudiante() {
    try {
        const id = await pregunta('Ingrese el ID del estudiante a eliminar: ');
        const estudianteEliminado = await eliminarEstudiante(id);
        console.log('Estudiante eliminado:', estudianteEliminado);
    } catch (error) {
        console.error('Error al eliminar estudiante:', error);
    }
}

function pregunta(pregunta) {
    return new Promise((resolve, reject) => {
        rl.question(pregunta, (respuesta) => {
            resolve(respuesta);
        });
    });
}

iniciarPrograma();
