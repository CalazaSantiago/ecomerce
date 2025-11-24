let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

let producto;

function toggleCarrito() {
    const carritoElemento = document.querySelector('.carrito');
    carritoElemento.style.display = carritoElemento.style.display === 'none' ? 'block' : 'none';
}

function agregarAlCarrito(nombre, precio, boton) {
    const productoExistente = carrito.find(p => p.nombre === nombre);

    if (productoExistente) {
        // Si ya está en el carrito, lo quitamos
        carrito = carrito.filter(p => p.nombre !== nombre);
        if (boton) boton.classList.remove('en-carrito');
    } else {
        // Si no está, lo agregamos
        carrito.push({ nombre, precio, cantidad: 1 });
        if (boton) boton.classList.add('en-carrito');
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCarrito();
}

function cambiarCantidad(nombre, delta) {
    const producto = carrito.find(p => p.nombre === nombre);
    if (!producto) return;

    producto.cantidad += delta;
    if (producto.cantidad < 1) {
        eliminarProducto(nombre);
    } else {
        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderizarCarrito();
    }
}

function eliminarProducto(nombre) {
    carrito = carrito.filter(p => p.nombre !== nombre);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCarrito();

    // Quitar color del botón si existe en la página principal
    const boton = document.querySelector(`.btn-agregar[data-nombre="${nombre}"]`);
    if (boton) boton.classList.remove('en-carrito');
}

function renderizarCarrito() {
    const contenedor = document.querySelector('.productos-carrito');
    if (!contenedor) return;
    contenedor.innerHTML = '';

    let total = 0;

    carrito.forEach(producto => {
        const item = document.createElement('div');
        item.className = 'producto';
        item.innerHTML = `
            <p>${producto.nombre}</p>
            <p>$${producto.precio.toLocaleString()}</p>
            <div>
                <button class="btn-product" onclick="cambiarCantidad('${producto.nombre}', -1)">-</button>
                <input class="input-prod" type="number" value="${producto.cantidad}" readonly style="width: 1.5rem; text-align: center;">
                <button class="btn-product" onclick="cambiarCantidad('${producto.nombre}', 1)">+</button>
                <button class="btn-product" onclick="eliminarProducto('${producto.nombre}')">🗑️</button>
            </div>
        `;
        contenedor.appendChild(item);
        total += producto.precio * producto.cantidad;
    });

    const totalElem = document.querySelector('.total');
    if (totalElem) totalElem.textContent = `Total: $${total.toLocaleString()}`;
}

// Al cargar la página, marca los botones de productos que ya están en el carrito
document.addEventListener('DOMContentLoaded', () => {
    carrito.forEach(item => {
        const boton = document.querySelector(`.btn-agregar[data-nombre="${item.nombre}"]`);
        if (boton) {
            boton.classList.add('en-carrito');
        }
    });
});

function cerrarCarrito() {
    document.querySelector('.carrito').style.display = 'none';
}

window.agregarAlCarrito = agregarAlCarrito;
window.agregarAFavoritos = agregarAFavoritos;