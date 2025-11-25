import pool from '../../config/server.js';

// Obtener usuario por email
export const obtenerUsuarioPorEmail = async (email) => {
    try {
        const [rows] = await pool.execute('SELECT id, email, password, role FROM users WHERE email = ? LIMIT 1', [email]);
        return rows.length ? rows[0] : null;
    } catch (err) {
        console.error('Error en obtenerUsuarioPorEmail:', err);
        throw err;
    }
};

// Verificar si el email ya existe
export const verificarEmailExistente = async (email) => {
    try {
        const [exists] = await pool.execute('SELECT id FROM users WHERE email = ? LIMIT 1', [email]);
        return exists.length > 0;
    } catch (err) {
        console.error('Error en verificarEmailExistente:', err);
        throw err;
    }
};

// Crear nuevo usuario
export const crearUsuario = async (nombre, email, passwordHash) => {
    try {
        const [result] = await pool.execute(
            'INSERT INTO users (nombre, email, password, role, created_at) VALUES (?, ?, ?, ?, NOW())',
            [nombre, email, passwordHash, 'user']
        );
        return result.insertId;
    } catch (err) {
        console.error('Error en crearUsuario:', err);
        throw err;
    }
};

// Guardar token para un usuario (single-session)
export const setToken = async (userId, token) => {
    try {
        const [result] = await pool.execute(
            'UPDATE users SET token = ? WHERE id = ?',
            [token, userId]
        );
        return result;
    } catch (err) {
        console.error('Error en setToken:', err);
        throw err;
    }
};

// Limpiar token del usuario
export const clearToken = async (userId) => {
    try {
        const [result] = await pool.execute(
            'UPDATE users SET token = NULL WHERE id = ?',
            [userId]
        );
        return result;
    } catch (err) {
        console.error('Error en clearToken:', err);
        throw err;
    }
};
