document.addEventListener("DOMContentLoaded", () => {
  // Recuperar favoritos desde localStorage
  let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

  const contenedorProd = document.getElementById('productos-lista') || document.querySelector('section.productos');

  const getProductos = async () => {
    try {
      const res = await fetch('/api/productos');
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const datos = await res.json();
      mostrarProductos(datos);
    } catch (err) {
      console.error('Error cargando productos:', err);
      if (contenedorProd) contenedorProd.innerHTML = '<p>Error al cargar productos.</p>';
    }
  };


  const imgPath = (p) => {
    // si no hay valor -> placeholder relativo al root público
    if (!p) return '/assets/img/placeholder.webp';

    // normalizar y quitar prefijo "public/" si lo tienen en la BD
    let pathStr = String(p).trim();

    // quitar prefijos innecesarios como 'public/' o './public/' o leading slashes duplicados
    pathStr = pathStr.replace(/^\.?\/?public\/+/i, '');
    pathStr = pathStr.replace(/^\/+/, '');

    // si ya es URL completa, devolverla
    if (/^https?:\/\//i.test(pathStr)) return pathStr;

    // devolver con slash al inicio para servir desde public
    return '/' + pathStr;
  };

  const mostrarProductos = (datos) => {
    if (!contenedorProd) return;
    contenedorProd.innerHTML = '';
    // Actualizar favoritos desde localStorage antes de renderizar
    favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    datos.forEach(item => {
      const src = imgPath(item.imagen);
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div class="top">
          <img src="${src}" alt="${item.nombre}" onerror="this.src='/assets/img/placeholder.webp'">
          <p class="titProd">${item.nombre}</p>
          <p class="descripcion">${item.descripcion || ''}</p>
        </div>
        <div class="bottom">
          <div class="precio">
            <span>$${Number(item.precio).toLocaleString('es-AR')}</span>
            <button class="favorito" data-id="${item.id}">🤍</button>
          </div>
          <div class="agregar">
            <div class="amount">
              <label class="descrpcion">Cant</label>
              <input type="number" name="cant" min="1" max="${item.stock||1}" value="1">
            </div>
            <button class="addcarrito" data-id="${item.id}">Agregar 🛒</button>
          </div>
        </div>`;
      contenedorProd.appendChild(card);

      const btnFav = card.querySelector('.favorito');
      // Verificar si ya está en favoritos
      const estaEnFavoritos = favoritos.find(f => f.id === item.id);
      btnFav.textContent = estaEnFavoritos ? '🖤' : '🤍';
      if (estaEnFavoritos) btnFav.classList.add('en-favoritos');
      
      btnFav.addEventListener('click', () => {
        if (typeof agregarAFavoritos === 'function') {
          agregarAFavoritos(item, btnFav);
        } else {
          console.warn('Función de favoritos no disponible');
        }
      });

      card.querySelector('.addcarrito').addEventListener('click', () => {
        const cant = parseInt(card.querySelector('[name="cant"]').value) || 1;
        if (typeof agregarAlCarrito === 'function') agregarAlCarrito(item, cant);
        else console.warn('Función agregarAlCarrito no disponible');
      });
    });
  };

  getProductos();
});