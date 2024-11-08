import { logout } from "./utils/utils.js";

const logoutButton = document.querySelector('.logout');

logoutButton.addEventListener('click',() => logout())