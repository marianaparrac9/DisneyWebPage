const conditional = document.getElementById('conditional-label');

const userActive = localStorage.getItem('user-active');
if (userActive) {
    conditional.innerText = '¡Bienvenido!';
    conditional.href = 'informacion.html';
} else {
    conditional.innerText = '¡Inicia sesión!';
    conditional.href = 'login.html';
}