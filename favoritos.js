import { obtenerUsuarioActivo } from './utils/utils.js';

// Selecciona el contenedor donde se mostrarán los productos
const boxContainer = document.querySelector('.wishlist-body');

// Función para cargar productos desde el JSON
function renderizarFavoritos() {
    
        // obtener los productos favoritos del usuario activo
        const usuarioActivo = obtenerUsuarioActivo();
        const favoritos = usuarioActivo.favoritos || [];
        const productos = favoritos;
        console.log(productos);
        

        // Limpia el contenedor antes de agregar productos
        boxContainer.innerHTML = '';

        // Recorre los productos y crea el HTML
        productos.forEach((producto) => {
            const box = document.createElement('div');
            box.classList.add('box');

            // Construye el contenido de cada producto
            box.innerHTML = `
                <a href="producto1.html?name=${encodeURIComponent(producto.name)}" class="image">
                    <img src="${producto.imagenes[0]}" alt="${producto.name}" />
                    <div class="iconos"> 
                        <a href="#" class="fav"><i class='bx bx-heart'></i></a>
                        <a href="producto1.html?name=${encodeURIComponent(producto.name)}" class="look"><i class='bx bx-info-circle'></i></a>
                    </div>
                </a>
                <div class="content">
                    <h3>${producto.name}</h3>
                    <div class="precio"> $${producto.precio}</div>
                </div>
            `;

            // Agrega la tarjeta al contenedor
            boxContainer.appendChild(box);
        });
        
}

// Llama a la función para renderizar los productos
renderizarFavoritos();
