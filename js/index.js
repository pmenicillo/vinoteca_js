const contenedor = document.getElementById("productos");
//Declaro un array con todos los productos y caracteristicas
const productos = [
    {
        id: 1, nombre: "Auka", tipo: "Malbec", precio: 450, stock: 25,        
        imagen: "https://sommelierenbicicleta.com/wp-content/uploads/2021/07/Auka-Malbec-2020-1.jpg",
    },
    {
        id: 2, nombre: "Marietta", tipo: "Malbec", precio: 650, stock: 23,
        imagen: "https://sommelierenbicicleta.com/wp-content/uploads/2021/07/Marietta-Malbec.jpg",
    },
    {
        id: 3, nombre: "Quinde", tipo: "Malbec", precio: 850, stock: 16,
        imagen: "https://sommelierenbicicleta.com/wp-content/uploads/2021/10/QUINDE.jpg",
    },
    {
        id: 4, nombre: "Red Puro", tipo: "Malbec", precio: 450, stock: 25,
        imagen: "https://sommelierenbicicleta.com/wp-content/uploads/2021/10/redpuro.jpg",
    },
    {
        id: 5, nombre: "La Danza", tipo: "Blend", precio: 1000, stock: 10,
        imagen: "https://sommelierenbicicleta.com/wp-content/uploads/2021/07/La-Danza-Blend-2019.jpg",
    },
    {
        id: 6, nombre: "Piedra Negra", tipo: "Malbec", precio: 1300, stock: 12,
        imagen: "https://sommelierenbicicleta.com/wp-content/uploads/2021/07/Piedra-Negra-Malbec-2020-Alta-Coleccion.jpg",
    },
    {
        id: 7, nombre: "Mara", tipo: "Bonarda", precio: 2300, stock: 10,
        imagen: "https://sommelierenbicicleta.com/wp-content/uploads/2022/04/Mara-Bonarda.jpg",
    },
    {
        id: 8, nombre: "El Nacional", tipo: "Blanco", precio: 900, stock: 25,
        imagen: "https://sommelierenbicicleta.com/wp-content/uploads/2022/04/nacional.jpg",
    },
    {
        id: 9, nombre: "Alto Sur", tipo: "Blanco", precio: 1200, stock: 12,
        imagen: "https://sommelierenbicicleta.com/wp-content/uploads/2022/04/altosursblanc.jpg",
    },
    {
        id: 10, nombre: "Serbal", tipo: "Blanco", precio: 1200, stock: 13,
        imagen: "https://sommelierenbicicleta.com/wp-content/uploads/2022/04/serbalsblanc.jpg",
    },
    {
        id: 11, nombre: "Piedra Negra", tipo: "Blanco", precio: 2000, stock: 8,
        imagen: "https://sommelierenbicicleta.com/wp-content/uploads/2022/04/PiedraNegraChardonnay.jpg",
    },
    {
        id: 12, nombre: "Alambrado", tipo: "Blanco", precio: 1000, stock: 14,
        imagen: "https://sommelierenbicicleta.com/wp-content/uploads/2022/04/alambradosblanc.jpg",
    },
]

//Estructura del contenedor
const getList = () => {     
    contenedor.innerHTML= ``
    for (const item of productos){
        let card = document.createElement("div");
        card.className = "container";
        card.innerHTML =
                `
                <div class="card" style="width: 16rem;">
                <img src="${item.imagen}" class="card-img-top" alt="${item.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${item.nombre}</h5>
                    <p class="card-text">Tipo: ${item.tipo}</p>
                    <p class="card-text">Precio: ${item.precio}</p>
                    <p class="card-text">Stock: ${item.stock}</p>
                    <div class="col"><button id="${item.id}" class="btn btn-primary">Comprar</button></div>
                </div>
                `
        contenedor.appendChild(card);
        let button = document.getElementById(item.id)
        button.addEventListener("click", () => agregarCarrito(item.id))
    };
};
getList();

//Guardar en carrito
function carritoLocalStorage(){
    localStorage.setItem("carrito", JSON.stringify(carrito));
} 

//MercadoPago
const pagar = async () => {
    const productosToMap = productos.map(Element => {
        let nuevoElemento = 
        {
            title: Element.nombre,
            description: Element.tipo,
            picture_url: Element.imagen,
            category_id: Element.id,
            quantity: Element.stock,
            currency_id: "ARS",
            unit_price: Element.precio
        }
        return nuevoElemento
    })
    let response = await fetch("https://api.mercadopago.com/checkout/preferences", {
        method: "POST", 
        headers: {
            Authorization: "Bearer TEST-4407970019793603-060122-00baec16ada36bde5a420efec843837a-119453291"
        },
        body: JSON.stringify({
            items: productosToMap
        })
    })
    let data = await response.json()
    console.log(data);
    window.open(data.init_point, "_blank")
}
