import { Router } from 'express';
import { obtenerProductos, obtenerProducto, crear, actualizar, eliminar } from '../controllers/producto.controller.js';
import { verificarAdmin } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', obtenerProductos);
router.get('/:id', obtenerProducto);
router.post('/', verificarAdmin, crear);
router.put('/:id', verificarAdmin, actualizar);
router.delete('/:id', verificarAdmin, eliminar);

export default router;
