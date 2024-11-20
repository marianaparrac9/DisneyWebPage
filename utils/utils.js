    //export const for obtain the users that are registered
    export const obtenerUsuarios = () => {
        const usuarios = localStorage.getItem('user');
        if (!usuarios){
            return [];
        }
        return JSON.parse(usuarios);
    };
    
    
    //export const for obtain the active user between the registered users
    export const obtenerUsuarioActivo = () => {
        const usuarioActivo = localStorage.getItem('user-active');
        return JSON.parse(usuarioActivo);

    };
    // export const for obtain the information of the active user from local storage
    export const obtenerInfoUsuarioActivo = () => {
        const usuarioActivo = localStorage.getItem('user-active');
        return JSON.parse(usuarioActivo);
    };

    export const logout = () => {
        const usuarioActivoKey = 'user-active'
        localStorage.removeItem(usuarioActivoKey);    
        window.location.href = "login.html";
        alert('Logout con exito')
    };
    
    