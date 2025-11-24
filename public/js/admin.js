document.addEventListener('DOMContentLoaded', function() {
  const abrir = document.getElementById('abrir-modal');
  const modal = document.getElementById('modal-destino');
  const cerrar = document.getElementById('cerrar-modal');

  if (abrir && modal && cerrar) {
    abrir.onclick = () => modal.classList.add('activo');
    cerrar.onclick = () => modal.classList.remove('activo');
  }
});

document.addEventListener('DOMContentLoaded', function() {
  // Modal de agregar (ya lo tienes)
  const abrir = document.getElementById('abrir-modal');
  const modal = document.getElementById('modal-destino');
  const cerrar = document.getElementById('cerrar-modal');
  if (abrir && modal && cerrar) {
    abrir.onclick = () => modal.classList.add('activo');
    cerrar.onclick = () => modal.classList.remove('activo');
  }
  // Modal de editar
  const modalEditar = document.getElementById('modal-editar');
  const cerrarEditar = document.getElementById('cerrar-modal-editar');

  document.querySelectorAll('.btn-editar').forEach(btn => {
    btn.onclick = function() {
      const producto = btn.closest('.producto');
      const nombre = producto.querySelector('.name')?.textContent || '';
      const precio = producto.querySelector('.precio')?.textContent.replace(/[^0-9,]/g, '').replace(',', '') || '';
      const imagen = producto.querySelector('img')?.getAttribute('src') || '';
      const descripcion = producto.querySelector('.descuento')?.textContent || '';

      // Rellenar el formulario de edición
      document.getElementById('editar-nombre').value = nombre;
      document.getElementById('editar-precio').value = precio;
      document.getElementById('editar-imagen').value = imagen;
      document.getElementById('editar-descripcion').value = descripcion;

      modalEditar.classList.add('activo');
    };
  });

  if (cerrarEditar && modalEditar) {
    cerrarEditar.onclick = () => modalEditar.classList.remove('activo');
  }
});

window.agregarAlCarrito = agregarAlCarrito;
window.agregarAFavoritos = agregarAFavoritos;