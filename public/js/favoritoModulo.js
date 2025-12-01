let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

// Alternar panel de favoritos
function toggleFavoritos() {
    const favoritosPanel = document.querySelector('.favoritos');
    const carritoPanel = document.querySelector('.carrito');
    
    if (favoritosPanel) {
        const isVisible = favoritosPanel.style.display === 'block';
        
        // Cerrar carrito si está abierto
        if (carritoPanel) carritoPanel.style.display = 'none';
        
        favoritosPanel.style.display = isVisible ? 'none' : 'block';
        if (!isVisible) {
            renderizarFavoritos();
        }
    }
}

// Agregar producto a favoritos
function agregarAFavoritos(producto, boton) {
    const existe = favoritos.find(f => f.id === producto.id);
    
    if (existe) {
        // Si ya está, lo quitamos
        favoritos = favoritos.filter(f => f.id !== producto.id);
        if (boton) {
            boton.textContent = '🤍';
            boton.classList.remove('en-favoritos');
        }
    } else {
        // Si no está, lo agregamos
        favoritos.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            descripcion: producto.descripcion
        });
        if (boton) {
            boton.textContent = '🖤';
            boton.classList.add('en-favoritos');
        }
    }
    
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    renderizarFavoritos();
}

// Eliminar de favoritos
function eliminarDeFavoritos(id) {
    favoritos = favoritos.filter(f => f.id !== id);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    renderizarFavoritos();
    
    // Actualizar el botón en la página principal si existe
    const boton = document.querySelector(`.favorito[data-id="${id}"]`);
    if (boton) {
        boton.textContent = '🤍';
        boton.classList.remove('en-favoritos');
    }
}

// Renderizar lista de favoritos
function renderizarFavoritos() {
    const contenedor = document.querySelector('.productos-favoritos');
    if (!contenedor) return;
    
    contenedor.innerHTML = '';
    
    if (favoritos.length === 0) {
        contenedor.innerHTML = '<p style="text-align: center; padding: 1rem;">No hay favoritos</p>';
        return;
    }
    
    favoritos.forEach(producto => {
        const item = document.createElement('div');
        item.className = 'favorito-item';
        const precioNum = Number(producto.precio) || 0;
        
        item.innerHTML = `
            <div class="favorito-info">
                <p class="favorito-nombre">${producto.nombre}</p>
                <p class="favorito-precio">$${precioNum.toLocaleString('es-AR')}</p>
            </div>
            <div class="favorito-acciones">
                <button class="btn-fav-eliminar" onclick="eliminarDeFavoritos(${producto.id})" title="Eliminar de favoritos">🖤</button>
                <button class="btn-fav-carrito" onclick="agregarFavoritoAlCarrito(${producto.id})" title="Agregar al carrito">🛒</button>
            </div>
        `;
        contenedor.appendChild(item);
    });
}

// Agregar favorito al carrito
function agregarFavoritoAlCarrito(id) {
    const producto = favoritos.find(f => f.id === id);
    if (producto && typeof agregarAlCarrito === 'function') {
        agregarAlCarrito(producto, 1);
        alert(`${producto.nombre} agregado al carrito`);
    }
}

// Marcar botones de favoritos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    favoritos.forEach(fav => {
        const boton = document.querySelector(`.favorito[data-id="${fav.id}"]`);
        if (boton) {
            boton.textContent = '🖤';
            boton.classList.add('en-favoritos');
        }
    });
});

// Exponer funciones globalmente
window.toggleFavoritos = toggleFavoritos;
window.agregarAFavoritos = agregarAFavoritos;
window.eliminarDeFavoritos = eliminarDeFavoritos;
window.agregarFavoritoAlCarrito = agregarFavoritoAlCarrito;
window.favoritos = favoritos;