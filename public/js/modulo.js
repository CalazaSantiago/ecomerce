document.addEventListener('DOMContentLoaded', () => {
    const headerEl = document.getElementById("header");
    if (headerEl) {
        const token = localStorage.getItem('token');
        const acederLink = token ? `<a href="#" id="btn-logout">CERRAR SESION</a>` : `<a href="login.html">ACCEDER</a>`;
        
        headerEl.innerHTML = ` 
        <header id="header">
          <div class="logo">Elegant™</div>
          <nav>
            <a href="index.html">SHOP</a>
            <a href="#">NEW IN</a>
            <a href="contacto.html">CONTACT</a>
            <a href="admin.html" style="display: none;" id="admin-link">ADMIN</a>
            ${acederLink}
            <a href="favorito.html">❤</a>
          </nav>
          <div class="iconos-header">
            <div class="favoritos-container">
              <span class="favoritos-icono" id="btn-favoritos">❤️</span>
              <div class="favoritos" style="display: none;">
                <div class="productos-favoritos"></div>
              </div>
            </div>
            <div class="carrito-container">
              <span class="carrito-icono" id="btn-carrito">🛒</span>
              <div class="carrito" style="display: none;">
                <div class="productos-carrito"></div>
                <div class="total">Total: $0</div>
                <a href="#" class="finalizar">Finalizar Compra</a>
                <button class="cerrar-carrito" id="cerrar-carrito">✖</button>
              </div>
            </div>
          </div>
        </header>`;

        // Agregar listener para logout
        const btnLogout = document.getElementById('btn-logout');
        if (btnLogout) {
            btnLogout.addEventListener('click', (e) => {
                e.preventDefault();
                logout();
            });
        }
    }

    const footerEl = document.getElementById("footer");
    if (footerEl) {
        footerEl.innerHTML = ` 
        <footer id="footer">
          <p>Copyright Elegant™ - 30718039947 - 2025. Todos los derechos reservados.</p>
        </footer>`;
    }

    // Verificar acceso de admin
    if (typeof window.verificarAccesoAdmin === 'function') {
        window.verificarAccesoAdmin();
    }

    // Delegar handlers sólo si las funciones existen
    const btnFav = document.getElementById('btn-favoritos');
    if (btnFav && typeof window.toggleFavoritos === 'function') {
        btnFav.addEventListener('click', () => window.toggleFavoritos());
    }

    const btnCarrito = document.getElementById('btn-carrito');
    if (btnCarrito && typeof window.toggleCarrito === 'function') {
        btnCarrito.addEventListener('click', () => window.toggleCarrito());
    }

    const btnCerrarCarrito = document.getElementById('cerrar-carrito');
    if (btnCerrarCarrito && typeof window.cerrarCarrito === 'function') {
        btnCerrarCarrito.addEventListener('click', () => window.cerrarCarrito());
    }

    // Exponer enlaces seguros sólo si existen las funciones
    if (typeof window.agregarAlCarrito === 'function') window.agregarAlCarrito = window.agregarAlCarrito;
    if (typeof window.agregarAFavoritos === 'function') window.agregarAFavoritos = window.agregarAFavoritos;
});

// Función de logout
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.href = '/index.html';
}

// ...existing code...
// proteger mostrarFavoritos para que no intente modificar nodos inexistentes
function mostrarFavoritos() {
    const cont = document.querySelector('.productos-favoritos');
    if (!cont) return; // salir si la UI no está en esta página
    const items = JSON.parse(localStorage.getItem('favoritos')) || [];
    if (!items.length) {
        cont.innerHTML = '<p>No hay favoritos</p>';
        return;
    }
    cont.innerHTML = items.map(i => `
        <div class="fav-item" data-id="${i.id}">
            <img src="${i.imagen || '/assets/img/placeholder.webp'}" alt="${i.nombre}" onerror="this.src='/assets/img/placeholder.webp'">
            <div class="fav-info">
                <p class="fav-nombre">${i.nombre}</p>
                <button class="fav-remove" data-id="${i.id}">Eliminar</button>
            </div>
        </div>
    `).join('');

    // añadir listeners de eliminar si existen botones
    cont.querySelectorAll('.fav-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.currentTarget.dataset.id;
            eliminarDeFavoritos(id);
            mostrarFavoritos();
        });
    });

        cont.querySelectorAll('.fav-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.currentTarget.dataset.id;
            if (typeof eliminarDeFavoritos === 'function') {
                eliminarDeFavoritos(id);
            } else {
                // fallback: borrar directamente desde localStorage si la función no existe
                let favs = JSON.parse(localStorage.getItem('favoritos')) || [];
                favs = favs.filter(f => String(f.id) !== String(id));
                if (favs.length) localStorage.setItem('favoritos', JSON.stringify(favs));
                else localStorage.removeItem('favoritos');
            }
            mostrarFavoritos();
        });
    });
}

// Exponer públicamente (si no lo hiciste ya)
window.recuperarFavoritos = typeof recuperarFavoritos === 'function' ? recuperarFavoritos : function(){ return JSON.parse(localStorage.getItem('favoritos')) || [] };
window.agregarAFavoritos = typeof agregarAFavoritos === 'function' ? agregarAFavoritos : function(){};
window.toggleFavoritos = typeof toggleFavoritos === 'function' ? toggleFavoritos : function(){};
window.toggleBtnFavoritos = typeof toggleBtnFavoritos === 'function' ? toggleBtnFavoritos : function(){};
window.mostrarFavoritos = mostrarFavoritos;