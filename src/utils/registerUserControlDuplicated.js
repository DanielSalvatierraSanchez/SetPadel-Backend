const registerUserControlDuplicated = (user, name, email, phone) => {
    if (user) {
        if (user.name == name) {
            return "El nombre ya está en uso por otro usuario.";
        }
        if (user.email == email) {
            return "El email ya está registrado por otro usuario.";
        }
        if (user.phone == phone) {
            return "El número de teléfono ya está registrado por otro usuario.";
        }
    }
    return null;
};

module.exports = { registerUserControlDuplicated };
