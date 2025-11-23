// HEADER
// ...existing code...
document.getElementById("header").innerHTML = ` 
<header id="header">
  <div class="logo">Elegant™</div>
  <nav>
    <a href="index.html">SHOP</a>
    <a href="#">NEW IN</a>
    <a href="contacto.html">CONTACT</a>
    <a href="admin.html">ADMIN</a>
    <a href="login.html">ACCEDER</a>
    <a href="favorito.html">❤</a>
  </nav>
  <div class="iconos-header">
    <div class="favoritos-container">
      <span class="favoritos-icono" onclick="toggleFavoritos()">❤️ </span>
      <div class="favoritos" style="display: none;">
        <div class="productos-favoritos"></div>
      </div>
    </div>
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
  </div>
</header> `;
// ...existing code...


// FOOTER
document.getElementById("footer").innerHTML = ` 
<footer id="footer">
  <p>Copyright Elegant™ - 30718039947 - 2025. Todos los derechos reservados.</p>
</footer> `;
 
window.agregarAlCarrito = agregarAlCarrito;
window.agregarAFavoritos = agregarAFavoritos;
