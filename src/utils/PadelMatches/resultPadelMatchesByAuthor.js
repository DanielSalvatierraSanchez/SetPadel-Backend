const resultPadelMatchesByAuthor = (res, padelMatches, param) => {
    padelMatches.length
        ? res.status(200).json({ message: `Listado de partidos creados por ${param}:`, padelMatches })
        : res.status(400).json({ message: `No hay ningún partido creado por ${param}.` });
};

module.exports = { resultPadelMatchesByAuthor };
