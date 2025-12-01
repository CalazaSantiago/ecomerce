import { Router } from 'express';
import { registrar, login, logout } from '../controllers/usuario.controller.js';
import { verificarAdmin, verificarToken, verificarTokenAdmin } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/register', registrar);
router.post('/login', login);
router.post('/logout', verificarToken, logout);

// Ruta protegida para verificar si es admin
router.get('/admin/verify', verificarAdmin, (req, res) => {
    res.json({ success: true, message: 'Acceso de admin verificado' });
});

// Ruta para verificar el token adicional de admin
router.post('/admin/verify-token', verificarAdmin, verificarTokenAdmin, (req, res) => {
    res.json({ success: true, message: 'Token de admin válido' });
});

export default router;
