document.getElementById("header").innerHTML = ` 
<header id="header">
    <div class="logo">Elegant™</div>
    <nav>
      <a href="inicio.html">SHOP</a>
      <a href="#">NEW IN</a>
      <a href="#">TSSY</a>
      <a href="#">TIENDAS</a>
      <a href="#">AYUDA</a>
      <a href="login.html">ACCEDER</a>
    </nav>
    <div id="icono-carrito" class="icons">
      🛒<span id="contador-carrito">0</span>
    </div>
  </header> `;

  //carrito//

  const carrito = [];
  const carritoLista = document.getElementById('carrito-lista');
  const carritoTotal = document.getElementById('carrito-total');
  const iconoCarrito = document.getElementById('icono-carrito');
  const carritoPanel = document.getElementById('carrito');

  iconoCarrito.addEventListener('click', () => {
    carritoPanel.classList.toggle('oculto');
  });

  function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    renderizarCarrito();
  }

  function renderizarCarrito() {
    carritoLista.innerHTML = '';
    let total = 0;

    carrito.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.nombre} - $${item.precio}`;
      carritoLista.appendChild(li);
      total += parseFloat(item.precio.replace('.', '').replace(',', '.'));
    });

    carritoTotal.textContent = total.toLocaleString('es-AR', { minimumFractionDigits: 2 });
  }

  document.getElementById('vaciar-carrito').addEventListener('click', () => {
    carrito.length = 0;
    renderizarCarrito();
  });

  // Asignar eventos a los botones de agregar
  document.querySelectorAll('.btn-agregar').forEach(btn => {
    btn.addEventListener('click', () => {
      const nombre = btn.dataset.nombre;
      const precio = btn.dataset.precio;
      agregarAlCarrito(nombre, precio);
    });
  });

  //cantidad de veces que se agrega o vacia el carrito//

  const contadorCarrito = document.getElementById('contador-carrito');

function renderizarCarrito() {
  carritoLista.innerHTML = '';
  let total = 0;

  carrito.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.nombre} - $${item.precio}`;
    carritoLista.appendChild(li);
    total += parseFloat(item.precio.replace('.', '').replace(',', '.'));
  });

  carritoTotal.textContent = total.toLocaleString('es-AR', { minimumFractionDigits: 2 });
  contadorCarrito.textContent = carrito.length; // 🔥 Actualiza el número al lado del 🛒
}

document.getElementById('vaciar-carrito').addEventListener('click', () => {
  carrito.length = 0;
  renderizarCarrito(); // esto ya actualiza el contador a 0
});
