//recuperar favoritos del locarlStorage o iniciarlo como un array vacio
const recuperarFavoritos = () => {
    return favoritos = JSON.parse(localStorage.getItem("favoritos")) || []
}

//eliminar de favoritos
const eliminarDeFavoritos = (id) => {
    recuperarFavoritos()
    favoritos = favoritos.filter(i => i.id != id)
    if (favoritos.length == 0) {
        localStorage.removeItem("favoritos")
    } else {
        localStorage.setItem("favoritos", JSON.stringify(favoritos))
    }

}

//agregar nuevo item a favoritos
const agregarAFavoritos = (item) => {
    recuperarFavoritos()
    favoritos.push(item)
    localStorage.setItem("favoritos", JSON.stringify(favoritos))
}

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

