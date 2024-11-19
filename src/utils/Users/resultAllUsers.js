const resultAllUsers = (res, users) => {
    users.length ? res.status(200).json({ message: "Listado completo de usuarios:", users }) : res.status(400).json({ message: "¡Hola! Eres el único usuario que existe... por ahora..." });
};

module.exports = { resultAllUsers };
