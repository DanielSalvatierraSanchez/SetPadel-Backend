const resultUsersByName = (res, userVar, param) => {
    userVar.length
        ? res.status(200).json({ message: `Listado de usuarios con el nombre ${param} :`, userVar })
        : res.status(400).json({ message: `No se ha encontrado ningún usuario con el nombre de ${param}` });
};

module.exports = { resultUsersByName };
