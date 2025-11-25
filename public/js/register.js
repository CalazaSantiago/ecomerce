document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const password_confirm = document.getElementById('password_confirm').value;

    // Validación cliente
    if (!nombre || !email || !password || !password_confirm) {
        alert('Por favor completa todos los campos');
        return;
    }

    if (password !== password_confirm) {
        alert('Las contraseñas no coinciden');
        return;
    }

    try {
        const res = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                nombre: nombre, 
                email: email, 
                password: password, 
                password_confirm: password_confirm 
            })
        });

        const data = await res.json();

        if (data.success) {
            alert('¡Registro exitoso! Ahora inicia sesión');
            document.getElementById('registerForm').reset();
            window.location.href = '/login.html';
        } else {
            alert('Error: ' + (data.error || 'Error desconocido'));
        }
    } catch (err) {
        console.error('Register error:', err);
        alert('Error al conectar con el servidor');
    }
});