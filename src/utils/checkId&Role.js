const idAndRoleChecked = (id, user) => {
    if (user._id.toString() !== id && user.role !== "admin") {
        return "¡Cuidado! No puedes hacer eso, únicamente puede hacerlo un Administrador.";
    }
    return null;
};

module.exports = { idAndRoleChecked };
