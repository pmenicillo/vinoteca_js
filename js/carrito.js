const tablaCarrito = document.getElementById("tablaCarrito");
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

//Utilizo elementos de la libreria Sweet Alert para dar alertas al realizar acciones. Tanto al agregar productos como al vaciar el carrito
const agregarCarrito = (id) => {  
    const seleccion = productos.find(item => item.id === id);
    const busqueda = carrito.findIndex(el => el.id === id); 
    if (busqueda === -1){ 
        carrito.push({
            id: seleccion.id,
            nombre: seleccion.nombre, 
            tipo: seleccion.tipo, 
            precio: seleccion.precio,  
            cantidad: 1, 
            imagen: seleccion.imagen,
        })
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Agregado al carrito',
            showConfirmButton: false,
            timer: 800
          })   
    } else {
        carrito[busqueda].cantidad = carrito[busqueda].cantidad + 1        
    }
    console.log(carrito);
}

const getCarrito = (item) => {    
    let acum = "";
    item.forEach((el)=>
    acum +=
        `
        <tr>
        <th scope="row">${el.id}</th>
        <td>${el.nombre}</td>
        <td>${el.tipo}</td>
        <td>${el.cantidad}</td>
        <td>$${el.precio *el.cantidad}</td>
        <td><img style="width:50px" src="${el.imagen}" alt="imagen"></td>
        </tr>
        `
    )
    console.log(acum);
    tablaCarrito.innerHTML = acum;
    carritoLocalStorage();
   
}   

const vaciarCarrito = () => {
    localStorage.clear();
    carrito = [];
    Swal.fire('Vaciaste el carrito')
}

let btnCarrito = document.getElementById('btnVerCarrito');
btnCarrito.addEventListener("click", () => getCarrito(carrito));

let btnVaciar = document.getElementById('btnVaciar');
btnVaciar.addEventListener("click", () => vaciarCarrito());

let btnPago = document.getElementById('btnPago');
btnPago.addEventListener("click", () => pagar());