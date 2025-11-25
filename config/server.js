import express from 'express';
import mysql from 'mysql2/promise';
import path from 'path';
import { fileURLToPath } from 'url';
import usuarioRoutes from '../src/routes/usuario.routes.js';
import productoRoutes from '../src/routes/producto.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecomerce',
    connectionLimit: 5,
    charset: 'utf8mb4'
});

pool.getConnection()
    .then(connection => {
        console.log('Conexión exitosa a la base de datos');
        connection.release();
    })
    .catch(err => {
        console.error('Error de conexión:', err);
    });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '..', 'public')));

// Rutas de usuarios (autenticación)
app.use('/', usuarioRoutes);
app.use('/api/usuarios', usuarioRoutes);
// Rutas de productos
app.use('/api/productos', productoRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

export default pool;