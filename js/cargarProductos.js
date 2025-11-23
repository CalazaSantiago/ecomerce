document.addEventListener('DOMContentLoaded', () => {
  fetch('assets/data/productos.json')
    .then(res => res.json())
    .then(productos => {
      const contenedor = document.getElementById('productos-lista');
      contenedor.innerHTML = '';
      productos.forEach(producto => {
        const div = document.createElement('div');
        div.className = 'producto';
        div.innerHTML = `
          <img src="${producto.imagen}" alt="${producto.alt}">
          <p class="name">${producto.nombre}</p>
          <p class="precio">$${producto.precio.toLocaleString('es-AR')}</p>
          <p class="descuento">$${producto.precioTransferencia.toLocaleString('es-AR')} <span>con Transferencia bancaria</span></p>
          <button class="bf" onclick="agregarAFavoritos('${producto.nombre}', '${producto.precio}', this)">❤️ Favorito</button>
          <button class="btn-agregar" data-nombre="${producto.nombre}" onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio}, this)">Agregar 🛒</button>
        `;
        contenedor.appendChild(div);
      });
    })
    .catch(error => {
      console.error('Error cargando productos:', error);
      document.getElementById('productos-lista').innerHTML = '<p>Error al cargar productos.</p>';
    });
});

window.agregarAlCarrito = agregarAlCarrito;
window.agregarAFavoritos = agregarAFavoritos;