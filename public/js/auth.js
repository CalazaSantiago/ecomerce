// Login
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const res = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('usuario', JSON.stringify(data.usuario));
        
        // Si es admin, pedir token adicional
        if (data.usuario.role === 'admin') {
            const adminToken = prompt('🔐 Acceso de Administrador\n\nPor favor, ingrese el token de administrador:');
            
            if (!adminToken) {
                alert('Token de administrador requerido');
                localStorage.removeItem('token');
                localStorage.removeItem('usuario');
                return;
            }
            
            // Verificar el token de admin
            const verifyRes = await fetch('/api/usuarios/admin/verify-token', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${data.token}`,
                    'x-admin-token': adminToken
                }
            });
            
            if (!verifyRes.ok) {
                alert('Token de administrador inválido');
                localStorage.removeItem('token');
                localStorage.removeItem('usuario');
                return;
            }
            
            // Guardar el token de admin para futuras peticiones
            localStorage.setItem('adminToken', adminToken);
        }
        
        window.location.href = '/index.html';
    } else {
        alert(data.error);
    }
});

// Logout
function logout() {
    const token = localStorage.getItem('token');
    if (token) {
        // Intentar limpiar token en servidor (opcional)
        fetch('/logout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).catch(err => console.warn('Logout request failed:', err));
    }
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.href = '/index.html';
}

// Obtener token
function getToken() {
    return localStorage.getItem('token');
}