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