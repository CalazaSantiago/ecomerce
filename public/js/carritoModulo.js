let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

let producto;

function toggleCarrito() {
    const carritoElemento = document.querySelector('.carrito');
    carritoElemento.style.display = carritoElemento.style.display === 'none' ? 'block' : 'none';
}

/**
 * agregarAlCarrito puede recibir:
 * - un objeto producto (item) y cantidad (number)
 * - o (nombre, precio) (legacy)
 */
function agregarAlCarrito(productOrName, precioOrCantidad, boton) {
    // Caso: se pasa objeto producto desde tienda.js -> agregarAlCarrito(item, cantidad)
    if (typeof productOrName === 'object' && productOrName !== null) {
        const item = productOrName;
        const cantidad = typeof precioOrCantidad === 'number' ? precioOrCantidad : 1;

        const existente = carrito.find(p => (p.id && item.id && p.id === item.id) || p.nombre === item.nombre);
        if (existente) {
            // aumentar cantidad
            existente.cantidad += cantidad;
        } else {
            carrito.push({ id: item.id, nombre: item.nombre, precio: Number(item.precio), cantidad });
        }

        // marcar boton si se pasa
        if (boton) boton.classList.add('en-carrito');
    } else {
        // Legacy: (nombre, precio)
        const nombre = String(productOrName || '');
        const precio = Number(precioOrCantidad || 0);
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
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCarrito();
}

function cambiarCantidad(identifier, delta) {
    // identifier puede ser id (number/string) o nombre
    const producto = carrito.find(p => (p.id && String(p.id) === String(identifier)) || p.nombre === identifier);
    if (!producto) return;

    producto.cantidad += delta;
    if (producto.cantidad < 1) {
        eliminarProducto(identifier);
    } else {
        localStorage.setItem('carrito', JSON.stringify(carrito));
        renderizarCarrito();
    }
}

// Manipular por índice (respaldo para entradas malformadas)
function cambiarCantidadIndex(idx, delta) {
    const index = Number(idx);
    if (isNaN(index) || index < 0 || index >= carrito.length) return;
    carrito[index].cantidad += delta;
    if (carrito[index].cantidad < 1) {
        carrito.splice(index, 1);
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCarrito();
}

function eliminarProductoIndex(idx) {
    const index = Number(idx);
    if (isNaN(index) || index < 0 || index >= carrito.length) return;
    const removed = carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCarrito();
    // Intentar limpiar botón visual
    const item = removed[0];
    if (item) {
        const botonById = item.id !== undefined ? document.querySelector(`.addcarrito[data-id="${item.id}"]`) : null;
        const botonByName = document.querySelector(`.btn-agregar[data-nombre="${item.nombre}"]`);
        if (botonById) botonById.classList.remove('en-carrito');
        if (botonByName) botonByName.classList.remove('en-carrito');
    }
}

function eliminarProducto(identifier) {
    // identifier puede ser id o nombre
    carrito = carrito.filter(p => !((p.id && String(p.id) === String(identifier)) || p.nombre === identifier));
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCarrito();

    // Quitar color del botón si existe en la página principal
    const botonById = document.querySelector(`.addcarrito[data-id="${identifier}"]`) || document.querySelector(`.btn-agregar[data-id="${identifier}"]`);
    const botonByName = document.querySelector(`.btn-agregar[data-nombre="${identifier}"]`);
    if (botonById) botonById.classList.remove('en-carrito');
    if (botonByName) botonByName.classList.remove('en-carrito');
}

function renderizarCarrito() {
    const contenedor = document.querySelector('.productos-carrito');
    if (!contenedor) return;
    contenedor.innerHTML = '';

    let total = 0;

    carrito.forEach(producto => {
        const item = document.createElement('div');
        item.className = 'producto';
        const precioNum = Number(producto.precio) || 0;
        // Determinar nombre a mostrar robustamente
        const displayName = (typeof producto.nombre === 'string') ? producto.nombre : (producto.nombre && (producto.nombre.nombre || producto.nombre.title || producto.nombre.titProd)) || producto.id || 'Producto';
        // Usaremos el índice como identificador en los handlers para garantizar eliminación
        const idx = carrito.indexOf(producto);
        item.innerHTML = `
            <p class="carrito-nombre">${displayName}</p>
            <p class="carrito-precio">$${precioNum.toLocaleString('es-AR')}</p>
            <div class="carrito-controls">
                <button class="btn-product" onclick="cambiarCantidadIndex(${idx}, -1)">-</button>
                <input class="input-prod" type="number" value="${producto.cantidad}" readonly style="width: 1.5rem; text-align: center;">
                <button class="btn-product" onclick="cambiarCantidadIndex(${idx}, 1)">+</button>
                <button class="btn-product" onclick="eliminarProductoIndex(${idx})">🗑️</button>
            </div>
        `;
        contenedor.appendChild(item);
        total += precioNum * producto.cantidad;
    });

    const totalElem = document.querySelector('.total');
    if (totalElem) totalElem.textContent = `Total: $${total.toLocaleString()}`;
}

// Al cargar la página, marca los botones de productos que ya están en el carrito
document.addEventListener('DOMContentLoaded', () => {
    carrito.forEach(item => {
        // marcar botones nuevos (.addcarrito) o legacy (.btn-agregar)
        const botonById = item.id !== undefined ? document.querySelector(`.addcarrito[data-id="${item.id}"]`) : null;
        const botonByName = document.querySelector(`.btn-agregar[data-nombre="${item.nombre}"]`);
        if (botonById) botonById.classList.add('en-carrito');
        if (botonByName) botonByName.classList.add('en-carrito');
    });
});

function cerrarCarrito() {
    document.querySelector('.carrito').style.display = 'none';
}

window.agregarAlCarrito = agregarAlCarrito;
window.cambiarCantidad = cambiarCantidad;
window.eliminarProducto = eliminarProducto;
window.cambiarCantidadIndex = cambiarCantidadIndex;
window.eliminarProductoIndex = eliminarProductoIndex;