import { Router } from 'express';
import { obtenerProductos, obtenerProducto, crear, actualizar, eliminar } from '../controllers/producto.controller.js';
import { verificarAdmin, verificarTokenAdmin } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', obtenerProductos);
router.get('/:id', obtenerProducto);
router.post('/', verificarAdmin, verificarTokenAdmin, crear);
router.put('/:id', verificarAdmin, verificarTokenAdmin, actualizar);
router.delete('/:id', verificarAdmin, verificarTokenAdmin, eliminar);

export default router;
