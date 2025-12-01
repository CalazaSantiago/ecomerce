# Token de Administrador

El token de administrador por defecto es:

```
ADMIN2025SECRET
```

Este token se solicita después de que un administrador inicie sesión con su email y contraseña.

## Cómo cambiar el token

Puedes cambiar el token de administrador editando el archivo `.env` o modificando directamente en `src/middleware/auth.middleware.js`:

```javascript
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'TU_NUEVO_TOKEN_AQUI';
```

## Seguridad

- Este token es adicional a las credenciales de email/password
- Se solicita mediante un prompt después del login exitoso
- Se almacena en localStorage para peticiones posteriores
- Es requerido para todas las operaciones de administración (crear, editar, eliminar productos)
