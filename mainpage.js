// Selecciona elementos del carrusel
const track = document.querySelector('.carousel-track');
const images = Array.from(track.children);
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');
const conditional = document.getElementById('conditional-label');

// Validar si un usuario está logueado consultando el localStorage y modificar el conditional innerText y su href
const userActive = localStorage.getItem('user-active');
if (userActive) {
    conditional.innerText = '¡Bienvenido!';
    conditional.href = 'informacion.html';
} else {
    conditional.innerText = '¡Inicia sesión!';
    conditional.href = 'login.html';
}
// Variables de control
let currentIndex = 0;
const totalImages = images.length;

// Función para mover el carrusel
const updateCarousel = () => {
    const imageWidth = images[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
};

// Evento para ir a la imagen anterior
prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? totalImages - 1 : currentIndex - 1;
    updateCarousel();
});

// Evento para ir a la siguiente imagen
nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex === totalImages - 1) ? 0 : currentIndex + 1;
    updateCarousel();
});
