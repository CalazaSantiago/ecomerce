import jwt from 'jsonwebtoken';
import pool from '../../config/server.js';

const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta_super_segura';

// Middleware para verificar token JWT
export const verificarToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token requerido' });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ error: 'Token inválido' });
        req.usuario = decoded;
        next();
    });
};

// Middleware para verificar si es admin
export const verificarAdmin = async (req, res, next) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];
        console.log('verificarAdmin - Token recibido:', token ? 'Sí' : 'No');
        
        if (!token) {
            console.log('Token no proporcionado');
            return res.status(401).json({ error: 'Token requerido' });
        }

        jwt.verify(token, JWT_SECRET, async (err, decoded) => {
            if (err) {
                console.log('Error al verificar token JWT:', err.message);
                return res.status(403).json({ error: 'Token inválido: ' + err.message });
            }

            console.log('Token JWT válido, usuario:', decoded.id);

            // Verificar que el usuario sea admin
            const [user] = await pool.execute(
                'SELECT role FROM users WHERE id = ? LIMIT 1',
                [decoded.id]
            );

            if (!user.length || user[0].role !== 'admin') {
                console.log('Usuario no es admin o no existe');
                return res.status(403).json({ error: 'Acceso denegado. Solo admins permitidos.' });
            }

            console.log('Usuario es admin');
            req.usuario = decoded;
            next();
        });
    } catch (err) {
        console.error('Error en verificarAdmin:', err);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// Middleware para verificar token adicional de admin desde la base de datos
export const verificarTokenAdmin = async (req, res, next) => {
    const adminToken = req.headers['x-admin-token'];
    console.log('Verificando token secreto de admin...');
    console.log('   Token recibido:', adminToken ? 'Sí' : 'No');
    
    if (!adminToken) {
        console.log('   Token de admin no enviado');
        return res.status(401).json({ error: 'Token de admin requerido' });
    }

    try {
        // Buscar el token en la columna admin_token de la base de datos
        const [users] = await pool.execute(
            'SELECT id FROM users WHERE role = ? AND admin_token = ? LIMIT 1',
            ['admin', adminToken]
        );

        if (!users.length) {
            console.log('   Token secreto de admin no válido o no encontrado');
            return res.status(403).json({ error: 'Token de admin inválido' });
        }

        console.log('   Token secreto de admin válido');
        next();
    } catch (err) {
        console.error('   Error al verificar token de admin:', err);
        return res.status(500).json({ error: 'Error al verificar token de admin' });
    }
};

export { JWT_SECRET };

