// Verificar si el usuario es admin y mostrar/ocultar el link
document.addEventListener('DOMContentLoaded', () => {
    verificarAccesoAdmin();
});

async function verificarAccesoAdmin() {
    try {
        // Obtener el token del localStorage (o sessionStorage según tu implementación)
        const token = localStorage.getItem('token');
        
        if (!token) {
            ocultarLinkAdmin();
            return;
        }

        // Verificar si el usuario es admin
        const response = await fetch('/api/usuarios/admin/verify', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            mostrarLinkAdmin();
        } else {
            ocultarLinkAdmin();
        }
    } catch (err) {
        console.error('Error al verificar acceso de admin:', err);
        ocultarLinkAdmin();
    }
}

function mostrarLinkAdmin() {
    const adminLink = document.querySelector('a[href="admin.html"]');
    if (adminLink) {
        adminLink.style.display = 'inline-block';
    }
}

function ocultarLinkAdmin() {
    const adminLink = document.querySelector('a[href="admin.html"]');
    if (adminLink) {
        adminLink.style.display = 'none';
    }
}

// Exponer globalmente para que modulo.js pueda usarlo
window.verificarAccesoAdmin = verificarAccesoAdmin;
