document.addEventListener("DOMContentLoaded", () => {

    recuperarFavoritos()
    // let favoritos = JSON.parse(localStorage.getItem("favoritos")) || []

    const endpoint = './data/datos.json'

    //forma Asincronica
    const getProductos = async () => {
        try {
            response = await fetch(endpoint)
            datos = await response.json()
            // console.log(datos)
            mostrarProductos(datos)
        } catch (error) {
            console.log(error)
        }
    }

    getProductos()


    const contenedorProd = document.querySelector("section.productos") // console.log(contenedorProd)
    const mostrarProductos = (datos) => {
        datos.forEach(item => { // console.log(item)
            //se crea el elemento contenedor del item
            const card = document.createElement("div")
            //se le suma la clase al elemento creado para el css
            card.className = "card"
            //se le adjunta al elemernto creado todo el html necesario y los valores para construir la card 
            card.innerHTML = `
                    <div class="top">
                        <img src="images/productos/${item.image}" alt="">
                        <p class="titProd">${item.title.toUpperCase()}</p>
                        <p class="descrpcion">${item.description.toLowerCase()} </p>
                        <a href="opiniones.html" class="resenias">ver reseñas</a>
                    </div>`

            const prodEncontrado = favoritos.find(p => p.id == item.id)

            if (!prodEncontrado) {
                card.innerHTML += `<div class="bottom">
                        <div class="precio">
                        <span>$${item.price}</span>                      
                        <button class="favorito"><i class="fa-solid fa-heart"></i></button>
                        </div>`
            } else {
                card.innerHTML += `<div class="bottom">
                        <div class="precio">
                        <span>$${item.price}</span>                      
                        <button class="favorito"><i class="fa-solid fa-heart-circle-check"></i></button>
                        </div>`
            }
            // card.innerHTML += `<div class="bottom">
            //            <div class="precio">
            //             <span>$${item.price}</span>                      
            //            <button class="favorito"><i class="fa-solid fa-heart"></i></button>
            //            </div>`
            card.innerHTML += `
                        <div class="agregar">
                            <div class="amount">
                                <span class="descrpcion"> Cant </span> 
                                <input type="number" name="cant" min="1" max=${parseInt(item.stock)} value="1">
                            </div>
                            <button class="addcarrito" id="addCarrito"><i class="fa-solid fa-cart-plus"></i></button>
                        </div>
                    </div>`


            //Agrego el producto al contenedor
            contenedorProd.appendChild(card);


            //agregar al carrito
            card.querySelector("#addCarrito").onclick = () => {
                const cant = parseInt(card.querySelector('[name="cant"]').value)
                agregarAlCarrito(item, cant)
                

            }

            //evento del boton favorito
            const btnFavorito = card.querySelector(".favorito")
            btnFavorito.onclick = () => {
                const iconoFavorito = card.querySelector(".favorito i")
                toggleBtnFavoritos(item, iconoFavorito)
            }


        }); //termina foreach
    } //termina mostrar productos

})//termina "DOMContentLoaded"

