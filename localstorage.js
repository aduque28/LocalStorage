

let nombrePro = document.querySelector(".nombre-producto");
let presentacionPro = document.querySelector(".presentacion-producto");
let precioPro = document.querySelector(".precio-producto");
let imagenPro = document.querySelector(".imagen-producto");
let btnGuardar = document.querySelector(".btn-guardar");
let inputBuscar = document.querySelector(".input-buscar");


btnGuardar.addEventListener("click", function() {
   guardarProducto();
   mostrarProductosGuardados();
});


function guardarProducto() {
    if( nombrePro.value == "" || presentacionPro.value == "" || 
        precioPro.value == "" || imagenPro.value == "") {
        alert("Todos los campos son obligatorios");
        return;
    }

    let producto = {
        nombre : nombrePro.value,
        presentacion : presentacionPro.value,
        precio : precioPro.value,
        imagen : imagenPro.value
    };

    
    let productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
    productosGuardados.push(producto);

   
    localStorage.setItem("productos", JSON.stringify(productosGuardados));

    
    nombrePro.value = "";
    presentacionPro.value = "";
    precioPro.value = "";
    imagenPro.value = "";
}


function mostrarProductosGuardados() {
    let productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
    let tbody = document.querySelector(".table tbody");


    tbody.innerHTML = "";

    // Iterar sobre los productos guardados y agregarlos a la tabla
    productosGuardados.forEach(function(producto, index) {
        let row = tbody.insertRow();
        let numero = row.insertCell(0);
        let nombre = row.insertCell(1);
        let presentacion = row.insertCell(2);
        let precio = row.insertCell(3);
        let imagen = row.insertCell(4);
        let editar = row.insertCell(5);
        let eliminar = row.insertCell(6);

        numero.textContent = index + 1;
        nombre.textContent = producto.nombre;
        presentacion.textContent = producto.presentacion;
        precio.textContent = producto.precio;
        imagen.innerHTML = `<img src="${producto.imagen}" style="width: 50px; height: 50px;">`;
        editar.innerHTML = `<button onclick="editarProducto(${index})">Editar</button>`;
        eliminar.innerHTML = `<button onclick="eliminarProducto(${index})">Eliminar</button>`;
    });
}


inputBuscar.addEventListener("input", function() {
    let textoBuscar = inputBuscar.value.toLowerCase();
    let productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
    let productosFiltrados = productosGuardados.filter(function(producto) {
        return producto.nombre.toLowerCase().includes(textoBuscar) || 
               producto.presentacion.toLowerCase().includes(textoBuscar) ||
               producto.precio.toLowerCase().includes(textoBuscar);
    });
    mostrarProductosFiltrados(productosFiltrados);
});


function mostrarProductosFiltrados(productos) {
    let tbody = document.querySelector(".table tbody");

   
    tbody.innerHTML = "";

 
    productos.forEach(function(producto, index) {
        let row = tbody.insertRow();
        let numero = row.insertCell(0);
        let nombre = row.insertCell(1);
        let presentacion = row.insertCell(2);
        let precio = row.insertCell(3);
        let imagen = row.insertCell(4);
        let editar = row.insertCell(5);
        let eliminar = row.insertCell(6);

        numero.textContent = index + 1;
        nombre.textContent = producto.nombre;
        presentacion.textContent = producto.presentacion;
        precio.textContent = producto.precio;
        imagen.innerHTML = `<img src="${producto.imagen}" style="width: 50px; height: 50px;">`;
        editar.innerHTML = `<button onclick="editarProducto(${index})">Editar</button>`;
        eliminar.innerHTML = `<button onclick="eliminarProducto(${index})">Eliminar</button>`;
    });
}
