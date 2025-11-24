const endpoint = './data/datos.json'
// const endpoint = 'https://fakestoreapi.com/products'

//PETICION SINCRONICA 
// fetch(endpoint)
// .then(response =>console.log(response)) //
// .then(response =>response.json()) //de la respuesta saca solo los datos json
// .then(json=> console.log(json))
// .then(json=> console.log(json[1]))

//PETICION ASINCRONA CON PROMESAS ASYNC/AWAIT
const obtenerProductos = async() => {
    response = await fetch(endpoint)
    // response = response.json() // si no coloca await sigue con el console.log y me muestra "promise pending"
    response = await response.json()
    console.log(response)
}

obtenerProductos()

//PETICION CON PROMESA COMPLETA ASYNC/AWAIT TRY/CATCH
//UNA PROMESA TIENE 3 ESTADOS:
// Pendiente (pending): estado inicial, antes de que la promesa tenga éxito o falle.
// Resuelto (resolved): promesa completada.
// Rechazado (rejected): promesa fallida.

const obtenerProductos2 = async() => {
    try{
    response = await fetch('./data/datos.json')
    // en forma consiente colocamos mal el nombre del archivo para provocar un error
    response = await response.json()
     console.log(response)
    }catch(error){
        console.log("error, no se pudo obtener datos")
    }
}
obtenerProductos2()