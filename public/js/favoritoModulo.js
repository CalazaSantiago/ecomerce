// ...existing code...
// declarar array global de favoritos
let favoritos = [];

//recuperar favoritos del localStorage o iniciarlo como un array vacio
const recuperarFavoritos = () => {
    favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    return favoritos;
}

//eliminar de favoritos
const eliminarDeFavoritos = (id) => {
    recuperarFavoritos();
    favoritos = favoritos.filter(i => i.id != id);
    if (favoritos.length == 0) {
        localStorage.removeItem("favoritos");
    } else {
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
    }
}

//agregar nuevo item a favoritos
const agregarAFavoritos = (item) => {
    recuperarFavoritos();
    // evitar duplicados
    if (!favoritos.find(f => f.id == item.id)) {
        favoritos.push(item);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
    }
}

// cambiar icono favorito llamando al modulo eliminar o agregar según corresponda
const toggleBtnFavoritos = (item, iconoFavorito) => {
    recuperarFavoritos();
    if (iconoFavorito.classList.contains("fa-heart-circle-check")) {
        eliminarDeFavoritos(item.id);
    } else {
        agregarAFavoritos(item);
    }
    //cambia icono favoritos
    iconoFavorito.classList.toggle("fa-heart-circle-check");
    iconoFavorito.classList.toggle("fa-heart");
}

// función pública para alternar favorito (llamada desde otros scripts)
// acepta: (item) ó (item, iconElement)
const toggleFavoritos = (item, icono) => {
    if (!item || !item.id) return;
    recuperarFavoritos();
    const exists = favoritos.find(f => f.id == item.id);
    if (exists) {
        eliminarDeFavoritos(item.id);
        if (icono) {
            icono.classList.remove('fa-heart-circle-check');
            icono.classList.add('fa-heart');
        }
    } else {
        agregarAFavoritos(item);
        if (icono) {
            icono.classList.remove('fa-heart');
            icono.classList.add('fa-heart-circle-check');
        }
    }
    return favoritos;
}

window.agregarAFavoritos = agregarAFavoritos;
window.toggleFavoritos = toggleFavoritos;
window.recuperarFavoritos = recuperarFavoritos;
window.toggleBtnFavoritos = toggleBtnFavoritos;
// ...existing code...