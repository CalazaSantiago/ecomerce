import { Router } from 'express';
import { registrar, login, logout } from '../controllers/usuario.controller.js';
import { verificarAdmin, verificarToken } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/register', registrar);
router.post('/login', login);
router.post('/logout', verificarToken, logout);

// Ruta protegida para verificar si es admin
router.get('/admin/verify', verificarAdmin, (req, res) => {
    res.json({ success: true, message: 'Acceso de admin verificado' });
});

export default router;
