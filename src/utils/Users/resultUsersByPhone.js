const resultUsersByPhone = (res, userVar, param) => {
    userVar.length
        ? res.status(200).json({ message: `El número de teléfono ${param} pertenece al usuario:`, userVar })
        : res.status(400).json({ message: `No se ha encontrado ningún usuario con el número de teléfono ${param}` });
};

module.exports = { resultUsersByPhone };
