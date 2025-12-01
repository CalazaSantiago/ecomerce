import jwt from 'jsonwebtoken';
import pool from '../../config/server.js';

const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta_super_segura';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'ADMIN2025SECRET';

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
        if (!token) return res.status(401).json({ error: 'Token requerido' });

        jwt.verify(token, JWT_SECRET, async (err, decoded) => {
            if (err) return res.status(403).json({ error: 'Token inválido' });

            // Verificar que el usuario sea admin
            const [user] = await pool.execute(
                'SELECT role FROM users WHERE id = ? LIMIT 1',
                [decoded.id]
            );

            if (!user.length || user[0].role !== 'admin') {
                return res.status(403).json({ error: 'Acceso denegado. Solo admins permitidos.' });
            }

            req.usuario = decoded;
            next();
        });
    } catch (err) {
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// Middleware para verificar token adicional de admin
export const verificarTokenAdmin = (req, res, next) => {
    const adminToken = req.headers['x-admin-token'];
    console.log('🔍 Verificando token de admin...');
    console.log('   Token recibido:', adminToken);
    console.log('   Token esperado:', ADMIN_TOKEN);
    console.log('   ¿Son iguales?:', adminToken === ADMIN_TOKEN);
    
    if (!adminToken) {
        console.log('   ❌ Token de admin no enviado');
        return res.status(401).json({ error: 'Token de admin requerido' });
    }
    if (adminToken !== ADMIN_TOKEN) {
        console.log('   ❌ Token de admin no coincide');
        return res.status(403).json({ error: 'Token de admin inválido' });
    }
    console.log('   ✅ Token de admin válido');
    next();
};

export { JWT_SECRET, ADMIN_TOKEN };

