// src/queries.js
import pool from './db';

async function agregarEstudiante(nombre, rut, curso, nivel) {
    const query = 'INSERT INTO estudiantes (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [nombre, rut, curso, nivel];

    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        return result.rows[0];
    } catch (error) {
        console.error('Error en agregarEstudiante:', error);
        throw error;
    }
}

async function consultarEstudiantes() {
    const query = 'SELECT * FROM estudiantes';

    try {
        const client = await pool.connect();
        const result = await client.query(query);
        client.release();
        return result.rows;
    } catch (error) {
        console.error('Error en consultarEstudiantes:', error);
        throw error;
    }
}

async function consultarEstudiantePorRut(rut) {
    const query = 'SELECT * FROM estudiantes WHERE rut = $1';
    const values = [rut];

    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        return result.rows[0];
    } catch (error) {
        console.error('Error en consultarEstudiantePorRut:', error);
        throw error;
    }
}

async function actualizarEstudiante(id, nombre, rut, curso, nivel) {
    const query = 'UPDATE estudiantes SET nombre = $2, rut = $3, curso = $4, nivel = $5 WHERE id = $1 RETURNING *';
    const values = [id, nombre, rut, curso, nivel];

    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        return result.rows[0];
    } catch (error) {
        console.error('Error en actualizarEstudiante:', error);
        throw error;
    }
}

async function eliminarEstudiante(id) {
    const query = 'DELETE FROM estudiantes WHERE id = $1 RETURNING *';
    const values = [id];

    try {
        const client = await pool.connect();
        const result = await client.query(query, values);
        client.release();
        return result.rows[0];
    } catch (error) {
        console.error('Error en eliminarEstudiante:', error);
        throw error;
    }
}

export { agregarEstudiante, consultarEstudiantes, consultarEstudiantePorRut, actualizarEstudiante, eliminarEstudiante };
