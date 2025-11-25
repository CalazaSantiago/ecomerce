import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
    obtenerUsuarioPorEmail,
    verificarEmailExistente,
    crearUsuario,
    setToken,
    clearToken
} from '../models/usuario.model.js';
import { JWT_SECRET } from '../middleware/auth.middleware.js';

// Registro de usuario
export const registrar = async (req, res) => {
    try {
        console.log('---- POST /register request body:', req.body);

        const nombre = (req.body.nombre || '').trim();
        const email = (req.body.email || '').trim().toLowerCase();
        const password = req.body.password || '';
        const password_confirm = req.body.password_confirm || '';

        if (!nombre || !email || !password || password !== password_confirm) {
            console.log('Register validation failed', { nombre, email, passwordPresent: !!password, password_confirm });
            return res.status(400).json({ error: 'Datos inválidos o incompletos' });
        }

        // Verificar si el email ya existe
        const emailExistente = await verificarEmailExistente(email);
        if (emailExistente) {
            console.log('Email already exists:', email);
            return res.status(400).json({ error: 'Email ya registrado' });
        }

        // Hashear la contraseña
        const hash = await bcrypt.hash(password, 10);
        console.log('Computed hash preview:', String(hash).slice(0, 30));

        // Crear el usuario
        const usuarioId = await crearUsuario(nombre, email, hash);
        console.log('DB insert result:', usuarioId);

        return res.json({ success: true, message: 'Usuario registrado correctamente' });

    } catch (err) {
        console.error('Register error:', err);
        return res.status(500).json({ error: 'Error en el servidor' });
    }
};

// Login de usuario
export const login = async (req, res) => {
    try {
        const email = (req.body.email || '').trim().toLowerCase();
        const password = req.body.password || '';

        if (!email || !password) {
            return res.status(400).json({ error: 'Email y contraseña requeridos' });
        }

        const usuario = await obtenerUsuarioPorEmail(email);
        if (!usuario) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const validPassword = await bcrypt.compare(password, usuario.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const token = jwt.sign({ id: usuario.id, email: usuario.email }, JWT_SECRET, { expiresIn: '7d' });
        // Guardar token en la base de datos (campo `token`) para controlar sesión
        try {
            await setToken(usuario.id, token);
        } catch (err) {
            console.error('No se pudo guardar token en DB:', err);
        }

        res.json({ 
            success: true, 
            token, 
            usuario: { id: usuario.id, email: usuario.email, role: usuario.role } 
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

// Logout de usuario
export const logout = async (req, res) => {
    try {
        // req.usuario viene del middleware verificarToken
        const userId = req.usuario?.id;
        if (userId) {
            await clearToken(userId);
        }
        return res.json({ success: true, message: 'Sesión cerrada' });
    } catch (err) {
        console.error('Logout error:', err);
        return res.status(500).json({ error: 'Error cerrando sesión' });
    }
};
