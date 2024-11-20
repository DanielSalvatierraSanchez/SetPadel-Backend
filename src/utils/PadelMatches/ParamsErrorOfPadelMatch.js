const ParamsErrorOfPadelMatch = (day, month, hour, place) => {
    if (day) {
        if (day < 1 || day > 31) {
            return "Introduce un día del 1 al 31";
        }
    }

    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    if (month) {
        if (!months.includes(month)) {
            return "Introduce el mes que corresponda: Enero, Febrero, Marzo, Abril, Mayo, Junio, Julio, Agosto, Septiembre, Octubre, Noviembre ó Diciembre";
        }
    }

    const hoursFormat = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (hour) {
        if (!hoursFormat.test(hour)) {
            return "Introduce la hora en un formato correcto: HH:mm";
        }
    }

    if (place) {
        if (place !== "Indoor" && place !== "Outdoor") {
            return "Introduce la zona de juego que corresponda: Indoor ó Outdoor";
        }
    }
};
module.exports = { ParamsErrorOfPadelMatch };
