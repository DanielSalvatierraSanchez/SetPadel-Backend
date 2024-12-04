const ParamsErrorOfUser = (name, password, phone, email) => {
    if (!name || !email || !password || !phone) {
        return "Todos los campos son obligatorios: Nombre, Email, Contraseña y Teléfono.";
    }
    if (name.length < 2 || name.length > 20) {
        return "El nombre debe de tener de 2 a 20 caracteres.";
    }
    if (password.length < 8 || password.length > 16) {
        return "La constraseña debe de tener entre 8 y 16 caracteres.";
    }
    if (isNaN(phone) || phone.length !== 9) {
        return "El teléfono debe de tener 9 dígitos.";
    }
};
module.exports = { ParamsErrorOfUser };
