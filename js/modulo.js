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
  <div id="icono-carrito" class="icons">
    🛒<span id="contador-carrito">0</span>
  </div>
</header> `;


// Carrito
let carrito = [];

// Agrega un producto al carrito
function agregarAlCarrito(nombre, precio) {
  const productoExistente = carrito.find(producto => producto.nombre === nombre);
  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }
  actualizarCarrito();
}

// Elimina un producto completamente del carrito
function eliminarProducto(nombre) {
  carrito = carrito.filter(producto => producto.nombre !== nombre);
  actualizarCarrito();
}

// Cambia la cantidad de un producto
function cambiarCantidad(nombre, cambio) {
  const producto = carrito.find(p => p.nombre === nombre);
  if (!producto) return;

  producto.cantidad += cambio;
  if (producto.cantidad <= 0) {
    eliminarProducto(nombre);
  } else {
    actualizarCarrito();
  }
}

// Actualiza la interfaz del carrito
function actualizarCarrito() {
  const carritoLista = document.getElementById("carrito-lista");
  const carritoTotal = document.getElementById("carrito-total");
  const contadorCarrito = document.getElementById("contador-carrito");

  carritoLista.innerHTML = "";
  let total = 0;
  let cantidadTotal = 0;

  carrito.forEach(producto => {
    const item = document.createElement("li");
    item.innerHTML = `
      ${producto.nombre} - Cantidad: ${producto.cantidad} - Precio: $${producto.precio * producto.cantidad}
      <button class="btn-menos" data-nombre="${producto.nombre}">-</button>
      <button class="btn-mas" data-nombre="${producto.nombre}">+</button>
      <button class="btn-eliminar" data-nombre="${producto.nombre}">x</button>
    `;
    carritoLista.appendChild(item);
    total += producto.precio * producto.cantidad;
    cantidadTotal += producto.cantidad;
  });

  carritoTotal.textContent = total.toLocaleString("es-AR");
  contadorCarrito.textContent = cantidadTotal;

  // Escuchamos los botones dentro del carrito
  document.querySelectorAll(".btn-menos").forEach(boton =>
    boton.addEventListener("click", () => cambiarCantidad(boton.dataset.nombre, -1))
  );
  document.querySelectorAll(".btn-mas").forEach(boton =>
    boton.addEventListener("click", () => cambiarCantidad(boton.dataset.nombre, 1))
  );
  document.querySelectorAll(".btn-eliminar").forEach(boton =>
    boton.addEventListener("click", () => eliminarProducto(boton.dataset.nombre))
  );
}

// Evento para todos los botones de agregar al carrito
document.querySelectorAll(".btn-agregar").forEach(boton => {
  boton.addEventListener("click", () => {
    const nombre = boton.dataset.nombre;
    let precioTexto = boton.dataset.precio;
    precioTexto = precioTexto.replace(/\./g, '').replace(',', '.'); // "38.000,00" → "38000.00"
    const precio = parseFloat(precioTexto);
    agregarAlCarrito(nombre, precio);
  });
});

// FOOTER
document.getElementById("footer").innerHTML = ` 
<footer id="footer">
  <div class="logo">Elegant™</div>
  <h2>Copyright Elegant™ - 30718039947 - 2025. Todos los derechos reservados.</h2>
</footer> `;
