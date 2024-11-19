const registerUserControlDuplicated = (user, email, phone) => {
    if (user) {
        if (user.email == email) {
            return "El email ya está registrado por otro usuario.";
        }
        if (user.phone == phone) {
            return "El número de teléfono ya está registrado por otro usuario.";
        }
    }
};

module.exports = { registerUserControlDuplicated };
