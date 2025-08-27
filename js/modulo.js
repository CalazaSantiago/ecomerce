// HEADER
document.getElementById("header").innerHTML = ` 
<header id="header">
  <div class="header-container">
    <div class="logo">Elegant™</div>
    
    <nav class="nav-menu">
      <a href="index.html">SHOP</a>
      <a href="#">NEW IN</a>
      <a href="contacto.html">CONTACT</a>
      <a href="admin.html">ADMIN</a>
      <a href="login.html">ACCEDER</a>
    </nav>

    <div class="icons-container">
      <div class="favoritos-container">
        <span class="favoritos-icono" onclick="toggleFavoritos()">❤️</span>
        <div class="favoritos" style="display: none;">
          <div class="productos-favoritos"></div>
        </div>
      </div>

      <div class="carrito-container">
        <span class="carrito-icono" onclick="toggleCarrito()">🛒</span>
        <div class="carrito" style="display: none;">
          <div class="productos-carrito"></div>
          <div class="total">Total: $0</div>
          <a href="#" class="finalizar">Finalizar Compra</a>
          <button class="cerrar-carrito" onclick="cerrarCarrito()">✖</button>
        </div>
      </div>
    </div>
  </div>
</header>
`;


// FOOTER
document.getElementById("footer").innerHTML = ` 
<footer id="footer">
  <p>Copyright Elegant™ - 30718039947 - 2025. Todos los derechos reservados.</p>
</footer> `;
 
