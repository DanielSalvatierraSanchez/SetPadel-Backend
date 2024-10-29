const ParamsErrorOfPadelMatch = (day, month, hour, place) => {
    if (!day || !month || !hour || !place) {
        return "Todos los campos son obligatorios: Título, Ubicación, Día, Mes, Hora y Zona.";
    }
    if (day < 1 || day > 31) {
        return "Introduce un día del 1 al 31";
    }

    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    if (!months.includes(month)) {
        return "Introduce el mes que corresponda: Enero, Febrero, Marzo, Abril, Mayo, Junio, Julio, Agosto, Septiembre, Octubre, Noviembre ó Diciembre";
    }

    const hoursFormat = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
    if (!hoursFormat.test(hour)) {
        return "Introduce la hora en un formato correcto: HH:mm";
    }

    if (place !== "Indoor" && place !== "Outdoor") {
        return "Introduce la zona de juego que corresponda: Indoor ó Outdoor";
    }
    return null;
};
module.exports = { ParamsErrorOfPadelMatch };
