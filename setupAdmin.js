import pool from './config/server.js';
import bcrypt from 'bcryptjs';

(async () => {
    try {
        // Agregar columna role si no existe
        await pool.execute(`
            ALTER TABLE users ADD COLUMN role VARCHAR(50) DEFAULT 'user' 
            AFTER created_at
        `).catch(() => {
            console.log('Columna role ya existe');
        });

        // Insertar admin si no existe
        const [existsAdmin] = await pool.execute(
            "SELECT id FROM users WHERE email = 'admin@elegant.com' LIMIT 1"
        );

        if (existsAdmin.length === 0) {
            const hashAdmin = await bcrypt.hash('admin123', 10);
            await pool.execute(
                "INSERT INTO users (nombre, email, password, role, created_at) VALUES (?, ?, ?, ?, NOW())",
                ['Administrador', 'admin@elegant.com', hashAdmin, 'admin']
            );
            console.log('Admin creado: admin@elegant.com / admin123');
        } else {
            console.log('Admin ya existe');
        }

        console.log('Base de datos configurada correctamente');
        process.exit(0);
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
})();
