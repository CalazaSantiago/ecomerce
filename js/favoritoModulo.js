// recuperar favoritos del localStorage o iniciarlo vacío
const recuperarFavoritos = () => {
    return favoritos = JSON.parse(localStorage.getItem("favoritos")) || []
}

// eliminar de favoritos
const eliminarDeFavoritos = (id) => {
    recuperarFavoritos()
    favoritos = favoritos.filter(i => i.id != id)
    if (favoritos.length == 0) {
        localStorage.removeItem("favoritos")
    } else {
        localStorage.setItem("favoritos", JSON.stringify(favoritos))
    }
}

// agregar a favoritos
const agregarAFavoritos = (item) => {
    recuperarFavoritos()
    favoritos.push(item)
    localStorage.setItem("favoritos", JSON.stringify(favoritos))
}

// alternar ícono favorito
const toggleBtnFavoritos = (item, iconoFavorito) => {
    recuperarFavoritos()
    if (iconoFavorito.classList.contains("fa-heart-circle-check")) {
        eliminarDeFavoritos(item.id)
    } else {
        agregarAFavoritos(item)
    }
    iconoFavorito.classList.toggle("fa-heart-circle-check");
    iconoFavorito.classList.toggle("fa-heart")
}
<button class="btn-favorito" data-id="1" data-nombre="Producto 1" data-precio="500">❤️ Favorito</button>
