<<<<<<< HEAD
//recuperar favoritos del locarlStorage o iniciarlo como un array vacio
=======
// recuperar favoritos del localStorage o iniciarlo vacío
>>>>>>> a35ec5a7d0759a31320765e4251ec63acb808f65
const recuperarFavoritos = () => {
    return favoritos = JSON.parse(localStorage.getItem("favoritos")) || []
}

<<<<<<< HEAD
//eliminar de favoritos
=======
// eliminar de favoritos
>>>>>>> a35ec5a7d0759a31320765e4251ec63acb808f65
const eliminarDeFavoritos = (id) => {
    recuperarFavoritos()
    favoritos = favoritos.filter(i => i.id != id)
    if (favoritos.length == 0) {
        localStorage.removeItem("favoritos")
    } else {
        localStorage.setItem("favoritos", JSON.stringify(favoritos))
    }
<<<<<<< HEAD

}

//agregar nuevo item a favoritos
=======
}

// agregar a favoritos
>>>>>>> a35ec5a7d0759a31320765e4251ec63acb808f65
const agregarAFavoritos = (item) => {
    recuperarFavoritos()
    favoritos.push(item)
    localStorage.setItem("favoritos", JSON.stringify(favoritos))
}

<<<<<<< HEAD
//cambiar icono favorito llamando al modulo eliminar o agregar según corresponda
const toggleBtnFavoritos = (item, iconoFavorito) => {
    // console.log(item, iconoFavorito)
    recuperarFavoritos()
    if (iconoFavorito.classList.contains("fa-heart-circle-check")) {
        // console.log("hay que eliminar de favoritos")
        eliminarDeFavoritos(item.id)
    } else {
        // console.log("hay que agregar a favoritos")
        agregarAFavoritos(item)
    }
    //cambia icono favoritos
    iconoFavorito.classList.toggle("fa-heart-circle-check");
    iconoFavorito.classList.toggle("fa-heart")


}

=======
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

window.agregarAlCarrito = agregarAlCarrito;
window.agregarAFavoritos = agregarAFavoritos;
>>>>>>> a35ec5a7d0759a31320765e4251ec63acb808f65
