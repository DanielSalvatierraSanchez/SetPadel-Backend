const idAndRoleChecked = (id, user) => {
    if (user._id.toString() !== id && user.role !== "admin") {
        return "No puedes modificar a otro usuario, únicamente puede hacerlo un Administrador.";
    }
};

const authorIdChecked = (user, padelMatch) => {
    if (padelMatch.author.toString() !== user._id.toString() && user.role !== "admin") {
        return "No puedes modificar un partido que no hayas creado tú, únicamente puede hacerlo un Administrador.";
    }
};

module.exports = { idAndRoleChecked, authorIdChecked };
