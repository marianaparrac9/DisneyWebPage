import { obtenerUsuarios } from "../utils/utils.js";

const frmLogin = document.getElementById('frmLogin');
const email = document.getElementById('email');
const password = document.getElementById('password');
const usuarioActivoKey = 'user-active';
const usuarios = obtenerUsuarios();



frmLogin.addEventListener("submit", loginUser);

function loginUser(event){
    // Prevenir eventos precargados
    event.preventDefault();
    
    // Obtener los datos del usuario
    const getLocal = localStorage.getItem('user');
    const validateUser = JSON.parse(getLocal);
    console.log(validateUser);


    //validar que el local storage no este vacio

    if (!validateUser){
        alert('No hay usuarios registrados');
        return;
    }
    
    // Validar que los campos no esten vacios
    if (email.value === '' || password.value === ''){
        alert('Por favor, llene todos los campos');
    }
    // Validar que el usuario este registrado
    else if (!validateUser.find(user => user.email === email.value)){
        alert('El usuario no esta registrado');
    }
    // Validar que la contraseña sea correcta
    else if (
        validateUser.find(user => user.email === email.value).password !== password.value){
        alert('Contraseña incorrecta');
        }  

    else {
        alert('Bienvenido');
        window.location.href = 'tienda.html'; 
        const user = validateUser.find(user => user.email === email.value && user.password === password.value);
        localStorage.setItem(usuarioActivoKey, JSON.stringify(user));

    }

    

    
};

const render = async () => {
    const usuarioActivo = localStorage.getItem('user-active');
    console.log(usuarioActivo);

    if (usuarioActivo) {
        window.location.href = "mainPage.html";
        return;
    }
};

document.addEventListener('DOMContentLoaded', render);


export const logout = () => {
    localStorage.removeItem(usuarioActivoKey);
    window.location.href = "login.html";
};