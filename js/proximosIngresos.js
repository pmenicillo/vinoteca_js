//Traigo listado de proximos ingresos desde un JSON
const tabla = document.querySelector('#lista-productos tbody');

function cargarProductos() {
    fetch('proximos.json')
        .then(respuesta => respuesta.json())
        .then(usuarios => {
            usuarios.forEach(usuario => {
                const row = document.createElement('tr');
                row.innerHTML += `
                    <td>${usuario.id}</td>
                    <td>${usuario.nombre}</td>
                    <td>${usuario.tipo}</td>
                    <td>$${usuario.precio}</td>
                `;
                tabla.appendChild(row);
            });
        }) 
}

cargarProductos();