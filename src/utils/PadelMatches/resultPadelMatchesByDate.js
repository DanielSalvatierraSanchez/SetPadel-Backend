const resultPadelMatchesByDay = (res, padelMatchVar, param) => {
    padelMatchVar.length ? res.status(200).json({ message: `Listado de partidos del día ${param}:`, padelMatchVar }) : res.status(400).json({ message: `El día ${param} no hay ningún partido.` });
};

module.exports = { resultPadelMatchesByDay };
