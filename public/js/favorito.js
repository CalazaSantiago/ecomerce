let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

function toggleFavoritos() {
    const panel = document.querySelector('.favoritos');
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
}

function agregarAFavoritos(nombre, precio, btn) {
    const productoExistente = favoritos.find(p => p.nombre === nombre);

    if (productoExistente) {
        // Si ya está en favoritos, lo removemos
        favoritos = favoritos.filter(p => p.nombre !== nombre);
        btn.classList.remove('activo');
    } else {
        // Agregar a favoritos
        favoritos.push({ nombre, precio });
        btn.classList.add('activo');
    }

    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    renderizarFavoritos();
}

function renderizarFavoritos() {
    const contenedor = document.querySelector('.productos-favoritos');
    contenedor.innerHTML = '';

    favoritos.forEach(producto => {
        const item = document.createElement('div');
        item.className = 'producto-favorito';
        item.innerHTML = `
            <p>${producto.nombre}</p>
            <p>$${producto.precio.toLocaleString()}</p>
            <button onclick="quitarFavorito('${producto.nombre}')">🗑️</button>
        `;
        contenedor.appendChild(item);
    });
}

function renderizarFavoritos() {
    const contenedor = document.querySelector('.productos-favoritos');
    contenedor.innerHTML = '';

    favoritos.forEach(producto => {
        const item = document.createElement('div');
        item.className = 'producto-favorito';
        item.innerHTML = `
            <div>
              <p><strong>${producto.nombre}</strong></p>
              <p>$${producto.precio.toLocaleString()}</p>
            </div>
            <div>
              <button onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">🛒</button>
              <button onclick="quitarFavorito('${producto.nombre}')">🗑️</button>
            </div>
        `;
        contenedor.appendChild(item);
    });
}


function quitarFavorito(nombre) {
    favoritos = favoritos.filter(p => p.nombre !== nombre);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    renderizarFavoritos();

    // Actualizar botón activo en la lista de productos
    const btn = document.querySelector(`.bf[onclick*="${nombre}"]`);
    if (btn) btn.classList.remove('activo');
}

// Inicializar botones según favoritos guardados
document.querySelectorAll('.bf').forEach(btn => {
    const nombre = btn.getAttribute('onclick').match(/'(.+?)'/)[1];
    if (favoritos.some(p => p.nombre === nombre)) {
        btn.classList.add('activo');
    }
});

window.agregarAlCarrito = agregarAlCarrito;
window.agregarAFavoritos = agregarAFavoritos;
