<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", () => {

    const contenedorItems = document.querySelector("section.productos")

    const mostrarFavoritos = () => {
        recuperarFavoritos()
        // let favoritos = JSON.parse(localStorage.getItem("favoritos")) || []
        //descargar el contenedor/limpiar
        contenedorItems.innerHTML = ""

        favoritos.forEach(item => {
            title = item.title.toUpperCase()
            description = item.description.toLowerCase()
            const card = document.createElement("div")
            card.className = "card"
            card.innerHTML = `
                    <div class="top">
                        <img src="images/productos/${item.image}" alt="">
                        <p class="titProd">${title}</p>
                        <p class="descrpcion">${description} </p>
                        <a href="opiniones.html" class="resenias">ver reseñas</a>
                    </div> 
                    <div class="bottom">
                        <div class="precio">
                        <span>$${item.price}</span>                      
                        <button class="favorito" id="favorito"><i class="fa-solid fa-heart-circle-check"></i></button>
                        </div>
                        <div class="agregar">
                            <div class="amount">
                                <span class="descrpcion"> Cant </span> 
                                <input type="number" name="cant" min="1" max=${parseInt(item.stock)} value="1">
                            </div>
                            <button class="addcarrito" id="addCarrito"><i class="fa-solid fa-cart-plus"></i></button>
                        </div>
                    </div>`

            //Agrego el producto al contenedor
            contenedorItems.appendChild(card);
         
            card.querySelector("#favorito").onclick = () => {
                 eliminarDeFavoritos(item.id)
                 mostrarFavoritos()
            }

            //agregar al carrito
            card.querySelector("#addCarrito").onclick = () => {
                const cant = parseInt(card.querySelector('[name="cant"]').value)
                agregarAlCarrito(item, cant)              
            }
           

        });
    }
    mostrarFavoritos()
})
=======
let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

function toggleFavoritos() {
    const panel = document.querySelector('.favoritos');
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
}

function agregarAFavoritos(nombre, precio, btn) {
    const productoExistente = favoritos.find(p => p.nombre === nombre);

    if (productoExistente) {
        // Si ya está en favoritos, lo removemos
        favoritos = favoritos.filter(p => p.nombre !== nombre);
        btn.classList.remove('activo');
    } else {
        // Agregar a favoritos
        favoritos.push({ nombre, precio });
        btn.classList.add('activo');
    }

    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    renderizarFavoritos();
}

function renderizarFavoritos() {
    const contenedor = document.querySelector('.productos-favoritos');
    contenedor.innerHTML = '';

    favoritos.forEach(producto => {
        const item = document.createElement('div');
        item.className = 'producto-favorito';
        item.innerHTML = `
            <p>${producto.nombre}</p>
            <p>$${producto.precio.toLocaleString()}</p>
            <button onclick="quitarFavorito('${producto.nombre}')">🗑️</button>
        `;
        contenedor.appendChild(item);
    });
}

function renderizarFavoritos() {
    const contenedor = document.querySelector('.productos-favoritos');
    contenedor.innerHTML = '';

    favoritos.forEach(producto => {
        const item = document.createElement('div');
        item.className = 'producto-favorito';
        item.innerHTML = `
            <div>
              <p><strong>${producto.nombre}</strong></p>
              <p>$${producto.precio.toLocaleString()}</p>
            </div>
            <div>
              <button onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">🛒</button>
              <button onclick="quitarFavorito('${producto.nombre}')">🗑️</button>
            </div>
        `;
        contenedor.appendChild(item);
    });
}


function quitarFavorito(nombre) {
    favoritos = favoritos.filter(p => p.nombre !== nombre);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    renderizarFavoritos();

    // Actualizar botón activo en la lista de productos
    const btn = document.querySelector(`.bf[onclick*="${nombre}"]`);
    if (btn) btn.classList.remove('activo');
}

// Inicializar botones según favoritos guardados
document.querySelectorAll('.bf').forEach(btn => {
    const nombre = btn.getAttribute('onclick').match(/'(.+?)'/)[1];
    if (favoritos.some(p => p.nombre === nombre)) {
        btn.classList.add('activo');
    }
});

window.agregarAlCarrito = agregarAlCarrito;
window.agregarAFavoritos = agregarAFavoritos;
>>>>>>> a35ec5a7d0759a31320765e4251ec63acb808f65
