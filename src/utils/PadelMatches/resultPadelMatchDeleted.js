const resultPadelMatchDeleted = (res, padelMatchVar) => {
    padelMatchVar ? res.status(200).json({ message: "Partido eliminado.", padelMatchVar }) : res.status(400).json({ message: "Ese partido ya no existe." });
};

module.exports = { resultPadelMatchDeleted };
