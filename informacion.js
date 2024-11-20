import { logout, obtenerUsuarioActivo } from "./utils/utils.js";

// Seleccionamos el contenedor principal donde se añadirá el formulario
const container = document.body;

// Función para renderizar el formulario dinámicamente
function renderForm() {
    // Obtiene todos los usuarios del localStorage
    const usuarios = JSON.parse(localStorage.getItem('user')) || [];
    // Obtiene el usuario activo usando la función proporcionada
    const usuarioActivo = obtenerUsuarioActivo();
    const user = usuarios.find((u) => u.email === usuarioActivo.email);

    if (!user) {
        console.error('Usuario no encontrado');
        return;
    }

    const card = document.createElement('div');
    card.classList.add('card');

    const header = document.createElement('div');
    header.classList.add('header');

    const profilePic = document.createElement('img');
    profilePic.src = './fotos/mickey.png';
    profilePic.alt = 'Mickey Mouse';
    profilePic.classList.add('profile-pic');

    const title = document.createElement('h1');
    title.textContent = 'Información personal';

    header.appendChild(profilePic);
    header.appendChild(title);

    const form = document.createElement('form');

    const infoForm = document.createElement('div');
    infoForm.classList.add('info-form');

    // Crear sección de información personal
    const personalSection = createFormSection([
        { label: 'Nombre', type: 'text', id: 'name', value: user.name, disabled: true },
        { label: 'Correo', type: 'email', id: 'email', value: user.email, disabled: true },
        { label: 'Dirección', type: 'text', id: 'address', placeholder: 'Ingresa tu dirección', disabled: true },
    ]);

    // Crear sección de información de pago
    const paymentSection = createFormSection(
        [
            { label: 'Número de tarjeta', type: 'text', id: 'card-number', placeholder: 'Número de tarjeta', disabled: true },
            { label: 'Fecha de expiración', type: 'text', id: 'exp-date', placeholder: 'MM/AA', disabled: true },
            { label: 'CVV', type: 'text', id: 'cvv', placeholder: 'CVV', disabled: true },
        ],
        'form-section payment-info'
    );

    infoForm.appendChild(personalSection);
    infoForm.appendChild(paymentSection);

    const ending = document.createElement('div');
    ending.classList.add('ending');

    // Botón para habilitar la edición
    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.type = 'button';
    editButton.addEventListener('click', () => toggleEditMode(infoForm));

    // Botón para guardar cambios
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Guardar cambios';
    saveButton.type = 'button';
    saveButton.disabled = true;
    saveButton.addEventListener('click', () => saveChanges(usuarios, user, infoForm, saveButton));

    const logoutButton = document.createElement('a');
    logoutButton.classList.add('logout');
    logoutButton.textContent = 'Cerrar sesión';
    logoutButton.addEventListener('click', () => logout());

    const exploreLink = document.createElement('a');
    exploreLink.href = 'tienda.html';
    exploreLink.classList.add('explore');
    exploreLink.textContent = '¡Vamos a explorar la tienda!';

    ending.appendChild(editButton);
    ending.appendChild(saveButton);
    ending.appendChild(logoutButton);
    ending.appendChild(exploreLink);

    form.appendChild(infoForm);
    form.appendChild(ending);

    card.appendChild(header);
    card.appendChild(form);

    container.appendChild(card);
}

// Función para crear una sección del formulario
function createFormSection(fields, className = 'form-section') {
    const section = document.createElement('div');
    section.classList.add(...className.split(' '));

    fields.forEach(field => {
        const label = document.createElement('label');
        label.setAttribute('for', field.id);
        label.textContent = field.label;

        const input = document.createElement('input');
        input.type = field.type;
        input.id = field.id;
        input.name = field.id;
        if (field.value) input.value = field.value;
        if (field.placeholder) input.placeholder = field.placeholder;
        if (field.disabled) input.disabled = field.disabled;

        section.appendChild(label);
        section.appendChild(input);
    });

    return section;
}

// Función para habilitar/deshabilitar edición
function toggleEditMode(infoForm) {
    const inputs = infoForm.querySelectorAll('input');
    inputs.forEach(input => input.disabled = !input.disabled);
    const saveButton = document.querySelector('button[type="button"]:disabled');
    if (saveButton) saveButton.disabled = false;
}

// Función para guardar cambios en el usuario y actualizar localStorage
function saveChanges(usuarios, user, infoForm, saveButton) {
    const inputs = infoForm.querySelectorAll('input');
    const [name, email, address, cardNumber, expDate, cvv] = inputs;

    // Validaciones simples
    if (!/^\d{16}$/.test(cardNumber.value)) {
        alert('El número de tarjeta debe tener 16 dígitos.');
        return;
    }
    if (!/^\d{2}\/\d{2}$/.test(expDate.value)) {
        alert('La fecha de expiración debe tener el formato MM/AA.');
        return;
    }
    if (!/^\d{3}$/.test(cvv.value)) {
        alert('El CVV debe tener 3 dígitos.');
        return;
    }

    // Actualiza los valores del usuario
    user.name = name.value;
    user.email = email.value;
    user.direccion = address.value;
    user.cardNumber = cardNumber.value;
    user.expireDate = expDate.value;
    user.ccv = cvv.value;

    // Actualiza localStorage
    const userIndex = usuarios.findIndex(u => u.id === user.id);
    if (userIndex !== -1) usuarios[userIndex] = user;
    localStorage.setItem('user', JSON.stringify(usuarios));
    // Actualiza el usuario activo
    localStorage.setItem('user-active', JSON.stringify(user));
    

    saveButton.disabled = true;
    alert('Cambios guardados exitosamente.');
}

// Renderizar el formulario
renderForm();
