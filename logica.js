import { obtenerUsuarioActivo } from './utils/utils.js';


const boxContainer = document.querySelector('.boxContainer');
const searchInput = document.getElementById('search-bar');


async function renderizarProductos() {
    // Obtiene todos los usuarios del localStorage
    const usuarios = JSON.parse(localStorage.getItem('user')) || [];
    // Obtiene el usuario activo usando la función proporcionada
    const usuarioActivo = obtenerUsuarioActivo();

    if (!usuarioActivo) {
        console.error('No hay un usuario activo');
        alert('debes iniciar sesión para poder acceder a la tienda');
        window.location.href = "login.html";
    }

    // Encuentra el usuario activo dentro del array de usuarios
    const user = usuarios.find((u) => u.email === usuarioActivo.email);

    if (!user) {
        console.error('Usuario activo no encontrado en la lista de usuarios');
        return;
    }

    // Función para agregar un producto a los favoritos del usuario
    const agregarFavorito = (producto) => {
        const favoritos = user.favoritos || [];

        // Verifica si el producto ya está en favoritos
        if (favoritos.some((fav) => fav.name === producto.name)) {
            alert('Este producto ya está en tus favoritos');
            return;
        }

        // Agrega el producto al array de favoritos
        favoritos.push(producto);
        user.favoritos = favoritos;

        // Actualiza el array de usuarios en el localStorage
        const index = usuarios.findIndex((u) => u.email === user.email);
        usuarios[index] = user;
        localStorage.setItem('user', JSON.stringify(usuarios));
        // actualiza el usuario activo
        localStorage.setItem('user-active', JSON.stringify(user));

        alert('Producto agregado a favoritos');
    };

    try {
        // Carga el archivo JSON
        const response = await fetch('./ListaData.json');
        const productos = await response.json();

        // Limpia el contenedor antes de agregar productos
        boxContainer.innerHTML = '';

        // Filtra los productos por el texto de búsqueda
        const filterProductos = (query) => {
            return productos.filter((producto) => producto.name.toLowerCase().includes(query.toLowerCase()));
        };

        // Muestra los productos filtrados
        const mostrarProductos = (productosFiltrados) => {
            boxContainer.innerHTML = ''; // Limpia el contenedor antes de mostrar los productos filtrados
            console.log(productosFiltrados);
           
            if (productosFiltrados.length === 0) {
                // Si no hay productos, muestra un mensaje directamente un contenedor nuevo 
                const mensaje = document.createElement('div');
                mensaje.classList.add('mensaje');
                mensaje.textContent = 'No se encontraron productos';
                boxContainer.appendChild(mensaje);
            }
            productosFiltrados.forEach((producto) => {
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

                // Selecciona el botón de favoritos para este producto y añade el evento de clic
                const botonFavorito = box.querySelector('.fav');
                botonFavorito.addEventListener('click', (event) => {
                    event.preventDefault();
                    agregarFavorito(producto);
                });
            });
        };

        // Muestra todos los productos inicialmente
        mostrarProductos(productos);

        // Agrega un evento para capturar el texto de búsqueda y filtrar productos
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.trim();
            const productosFiltrados = filterProductos(query);
            mostrarProductos(productosFiltrados);
        });

    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

// Llama a la función para renderizar los productos
renderizarProductos();
