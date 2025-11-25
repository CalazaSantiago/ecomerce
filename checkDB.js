import pool from './config/server.js';

(async () => {
    try {
        const [columns] = await pool.query('DESCRIBE users');
        console.log('Estructura de tabla users:');
        console.table(columns);
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
})();
