import pool from '../../config/server.js';

// Obtener todos los productos
export const obtenerTodosProductos = async () => {
    try {
        const [productos] = await pool.execute('SELECT * FROM productos');
        return productos;
    } catch (err) {
        console.error('Error en obtenerTodosProductos:', err);
        throw err;
    }
};

// Obtener producto por ID
export const obtenerProductoPorId = async (id) => {
    try {
        const [producto] = await pool.execute('SELECT * FROM productos WHERE id = ? LIMIT 1', [id]);
        return producto.length ? producto[0] : null;
    } catch (err) {
        console.error('Error en obtenerProductoPorId:', err);
        throw err;
    }
};

// Crear producto
export const crearProducto = async (nombre, descripcion, precio, stock, imagen) => {
    try {
        const [result] = await pool.execute(
            'INSERT INTO productos (nombre, descripcion, precio, stock, imagen) VALUES (?, ?, ?, ?, ?)',
            [nombre, descripcion, precio, stock, imagen]
        );
        return result.insertId;
    } catch (err) {
        console.error('Error en crearProducto:', err);
        throw err;
    }
};

// Actualizar producto
export const actualizarProducto = async (id, nombre, descripcion, precio, stock, imagen) => {
    try {
        await pool.execute(
            'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ?, imagen = ? WHERE id = ?',
            [nombre, descripcion, precio, stock, imagen, id]
        );
        return true;
    } catch (err) {
        console.error('Error en actualizarProducto:', err);
        throw err;
    }
};

// Eliminar producto
export const eliminarProducto = async (id) => {
    try {
        await pool.execute('DELETE FROM productos WHERE id = ?', [id]);
        return true;
    } catch (err) {
        console.error('Error en eliminarProducto:', err);
        throw err;
    }
};
