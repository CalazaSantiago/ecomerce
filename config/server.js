const express = require('express');

import mysql from 'mysql2/promise';
const pool = mysql.createPool({
    host: 'localhost',
    user:  'root',
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

export default pool;

const app = express();

 app.post('/register', async (req, res) => {
      try {
        const email = (req.body.email || '').trim().toLowerCase();
        const password = req.body.password || '';
        const password_confirm = req.body.password_confirm || '';

        if (!email || !password || password !== password_confirm) {
          // redirigir al formulario con query string simple
          return res.redirect('/register.html?error=invalid');
        }

        // comprobar si email ya existe
        const [rows] = await pool.execute('SELECT id FROM users WHERE email = ? LIMIT 1', [email]);
        if (rows.length > 0) {
          return res.redirect('/register.html?error=exists');
        }

        // hashear contraseña
        const hash = await bcrypt.hash(password, 10);

        // insertar usuario
        await pool.execute('INSERT INTO users (email, password) VALUES (?, ?)', [email, hash]);

        return res.redirect('/index.html?registered=1');
      } catch (err) {
        console.error('Register error:', err);
        return res.redirect('/register.html?error=server');
      }
    });
