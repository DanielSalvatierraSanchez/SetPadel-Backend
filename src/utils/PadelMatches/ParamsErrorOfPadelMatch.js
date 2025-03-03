const ParamsErrorOfPadelMatch = (title, location, date, place) => {
    if (!title || !location || !date) {
        return "Todos los campos son obligatorios: Título, Ubicación, Fecha y Hora.";
    }

    if (place) {
        if (place !== "Indoor" && place !== "Outdoor") {
            return "Introduce la zona de juego que corresponda: Indoor ó Outdoor";
        }
    }
};

module.exports = { ParamsErrorOfPadelMatch };
