// Verificación de acceso a la página de administración (SEGUNDA VERIFICACIÓN)
document.addEventListener('DOMContentLoaded', async () => {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    const token = localStorage.getItem('token');
    const adminToken = localStorage.getItem('adminToken');

    // Verificar que el usuario esté logueado y sea admin
    if (!usuario || !token || usuario.role !== 'admin') {
        alert('Acceso denegado. Debes iniciar sesión como administrador.');
        window.location.href = '/login.html';
        return;
    }

    // SEGUNDA VERIFICACIÓN: Pedir el token de admin nuevamente
    if (!adminToken) {
        const token2 = prompt('VERIFICACIÓN DE ADMINISTRADOR (2/2)\n\nPor seguridad, ingrese nuevamente su token secreto:');
        
        if (!token2) {
            alert('Token de administrador requerido para acceder');
            window.location.href = '/index.html';
            return;
        }

        // Verificar el token con el servidor
        try {
            const verifyRes = await fetch('/api/usuarios/admin/verify-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'x-admin-token': token2
                }
            });

            const verifyData = await verifyRes.json();

            if (!verifyRes.ok) {
                alert('Token de administrador inválido: ' + (verifyData.error || 'Verificación fallida'));
                window.location.href = '/index.html';
                return;
            }

            // Si la verificación es exitosa, guardar el token para esta sesión
            localStorage.setItem('adminToken', token2);
            console.log('Acceso de administrador verificado');

        } catch (error) {
            console.error('Error al verificar token:', error);
            alert('Error al verificar el token de administrador');
            window.location.href = '/index.html';
            return;
        }
    } else {
        // Si ya tiene el token guardado, verificarlo de nuevo
        try {
            const verifyRes = await fetch('/api/usuarios/admin/verify-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'x-admin-token': adminToken
                }
            });

            if (!verifyRes.ok) {
                // Token inválido o expirado, pedir uno nuevo
                localStorage.removeItem('adminToken');
                window.location.reload();
                return;
            }

            console.log('Token de administrador válido');

        } catch (error) {
            console.error('Error al verificar token:', error);
            localStorage.removeItem('adminToken');
            window.location.reload();
        }
    }
});
