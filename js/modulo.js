// HEADER
document.getElementById("header").innerHTML = ` 
<header id="header">
  <div class="logo">Elegant™</div>
  <nav>
    <a href="index.html">SHOP</a>
    <a href="#">NEW IN</a>
    <a href="#">TSSY</a>
    <a href="admin.html">ADMIN</a>
    <a href="login.html">ACCEDER</a>
  </nav>
        <div class="carrito-container">
    <span class="carrito-icono" onclick="toggleCarrito()">🛒</span>
    <div class="carrito" style="display: none;">
        <div class="productos-carrito">
            <!-- Los productos se insertarán aquí dinámicamente -->
        </div>
        <div class="total">Total: $0</div>
        <a href="#" class="finalizar">Finalizar Compra</a>
        <button class="cerrar-carrito" onclick="cerrarCarrito()">✖</button>
    </div>
</div>
</header> `;

let carrito = [];

let producto 

function toggleCarrito() {
    const carritoElemento = document.querySelector('.carrito');
    carritoElemento.style.display = carritoElemento.style.display === 'none' ? 'block' : 'none';
}


function agregarAlCarrito(nombre, precio) {
  const productoExistente = carrito.find(p => p.nombre === nombre);

  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }

   


  renderizarCarrito();
}


function cambiarCantidad(nombre, delta) {
    const producto = carrito.find(p => p.nombre === nombre);
    if (!producto) return;

    producto.cantidad += delta;
    if (producto.cantidad < 1) {
        eliminarProducto(nombre);
    } else {
        renderizarCarrito();
    }
}

function eliminarProducto(nombre) {
    carrito = carrito.filter(p => p.nombre !== nombre);
    renderizarCarrito();
}

function renderizarCarrito() {
    const contenedor = document.querySelector('.productos-carrito');
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

    document.querySelector('.total').textContent = `Total: $${total.toLocaleString()}`;

}
function cerrarCarrito() {
 document.querySelector('.carrito').style.display = 'none';
}


// FOOTER
document.getElementById("footer").innerHTML = ` 
<footer id="footer">
  <p>Copyright Elegant™ - 30718039947 - 2025. Todos los derechos reservados.</p>
</footer> `;
 
