import express from 'express';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

const app = express();
const PORT = process.env.PORT || 3000;

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecomerce',
    connectionLimit: 5
});

pool.getConnection()
    .then(connection => {
        console.log('Conexión exitosa a la base de datos');
        connection.release();
    })
    .catch(err => {
        console.error('Error de conexión a la base de datos:', err);
    });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// =====================
//       REGISTER
// =====================

app.post('/register', async (req, res) => {
    try {
        const email = (req.body.email || '').trim().toLowerCase();
        const password = req.body.password || '';
        const password_confirm = req.body.password_confirm || '';

        if (!email || !password || password !== password_confirm) {
            return res.redirect('/register.html?error=invalid');
        }

        const [rows] = await pool.execute(
            'SELECT id FROM users WHERE email = ? LIMIT 1',
            [email]
        );
        if (rows.length > 0) {
            return res.redirect('/register.html?error=exists');
        }

        const hash = await bcrypt.hash(password, 10);
        await pool.execute(
            'INSERT INTO users (email, password) VALUES (?, ?)',
            [email, hash]
        );

        return res.redirect('/index.html?registered=1');
    } catch (err) {
        console.error('Register error:', err);
        return res.redirect('/register.html?error=server');
    }
});

// =============================
//   CRUD DE PRODUCTOS (NUEVO)
// =============================

// Obtener todos los productos
app.get('/productos', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM products');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});

// Agregar producto
app.post('/productos', async (req, res) => {
    try {
        const { nombre, precio, descripcion, imagen } = req.body;

        if (!nombre || !precio) {
            return res.status(400).json({ error: 'Nombre y precio son obligatorios' });
        }

        await pool.execute(
            'INSERT INTO products (nombre, precio, descripcion, imagen) VALUES (?, ?, ?, ?)',
            [nombre, precio, descripcion || '', imagen || '']
        );

        res.json({ mensaje: 'Producto agregado correctamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al agregar producto' });
    }
});

// Editar producto
app.put('/productos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, precio, descripcion, imagen } = req.body;

        await pool.execute(
            'UPDATE products SET nombre=?, precio=?, descripcion=?, imagen=? WHERE id=?',
            [nombre, precio, descripcion, imagen, id]
        );

        res.json({ mensaje: 'Producto actualizado' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al actualizar producto' });
    }
});

// Eliminar producto
app.delete('/productos/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await pool.execute('DELETE FROM products WHERE id=?', [id]);

        res.json({ mensaje: 'Producto eliminado' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar producto' });
    }
});

// =====================
//      SERVER
// =====================

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

export default pool;
