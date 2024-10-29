const resultUserDeleted = (res, userVar) => {
    userVar ? res.status(200).json({ message: "Usuario eliminado correctamente.", userVar }) : res.status(400).json({ message: "Ese usuario ya no existe." });
};

module.exports = { resultUserDeleted };
