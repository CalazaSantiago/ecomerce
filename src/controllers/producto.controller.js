import {
    obtenerTodosProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto
} from '../models/producto.model.js';

// Obtener todos los productos
export const obtenerProductos = async (req, res) => {
    try {
        const productos = await obtenerTodosProductos();
        res.json(productos);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
};

// Obtener un producto por ID
export const obtenerProducto = async (req, res) => {
    try {
        const producto = await obtenerProductoPorId(req.params.id);
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json(producto);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Error al obtener producto' });
    }
};

// Crear un nuevo producto
export const crear = async (req, res) => {
    try {
        const { nombre, descripcion, precio, stock, imagen } = req.body;
        if (!nombre || !precio || !stock) {
            return res.status(400).json({ error: 'Datos incompletos' });
        }

        const productoId = await crearProducto(nombre, descripcion, precio, stock, imagen);
        res.json({ success: true, id: productoId });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Error al crear producto' });
    }
};

// Actualizar un producto
export const actualizar = async (req, res) => {
    try {
        const { nombre, descripcion, precio, stock, imagen } = req.body;
        await actualizarProducto(req.params.id, nombre, descripcion, precio, stock, imagen);
        res.json({ success: true });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Error al actualizar producto' });
    }
};

// Eliminar un producto
export const eliminar = async (req, res) => {
    try {
        await eliminarProducto(req.params.id);
        res.json({ success: true });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Error al eliminar producto' });
    }
};
