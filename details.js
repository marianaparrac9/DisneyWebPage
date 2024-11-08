// Cargar los parámetros de la URL
const params = new URLSearchParams(window.location.search);
const nameFromUrl = params.get('name');

// Cargar los datos desde el archivo JSON
let data = [];

fetch('./ListaData.json')
    .then(response => response.json())
    .then(jsonData => {
        data = jsonData; // Guardamos los datos en la variable global
        renderProduct(); // Llamamos a la función para renderizar el producto
    })
    .catch(error => console.error("Error al cargar los datos:", error));

// Función para obtener el producto según el nombre
function getProduct() {
    for (let i = 0; i < data.length; i++) {
        let map = data[i];
        let title = map["name"];
        
        if (title === nameFromUrl) {
            return new Product(
                map["name"],
                map["caracteristica1"],
                map["caracteristica2"],
                map["caracteristica3"],
                map["precio"],
                map["cantidad"],
                map["imagenes"]
            );
        }
    }
}

// Función para renderizar el producto en el DOM
function renderProduct() {
    let product = getProduct();
    if (!product) {
        console.error("No se encontró el producto");
        return;
    }

    // Asignación de los elementos a las propiedades del producto
    document.getElementById("title").innerHTML = product.name;
    document.getElementById("caracteristica1").innerHTML = product.caracteristica1;
    document.getElementById("caracteristica2").innerHTML = product.caracteristica2;
    document.getElementById("caracteristica3").innerHTML = product.caracteristica3;
    document.getElementById("price").innerHTML = "$" + product.precio;
    document.getElementById("main-img").src = product.imagenes[0];
    document.getElementById("image1").src = product.imagenes[1];
    document.getElementById("image2").src = product.imagenes[2];
}

// Controladores para incrementar/decrementar la cantidad
let cantidad = 1;
document.querySelector('.bxs-plus-circle').addEventListener('click', function () {
    cantidad++;
    document.querySelector('.cantidad h1').textContent = cantidad;
});

document.querySelector('.bxs-no-entry').addEventListener('click', function () {
    if (cantidad > 1) {
        cantidad--;
        document.querySelector('.cantidad h1').textContent = cantidad;
    }
});