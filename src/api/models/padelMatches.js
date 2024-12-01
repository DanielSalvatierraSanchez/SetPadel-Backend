const mongoose = require("mongoose");

const padelMatchSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        location: { type: String, required: true, trim: true },
        date: { type: String, required: true, trim: true }, //todo date y hour
        day: { type: String, required: true }, // estaba como Number
        month: { type: String, required: true, trim: true, enum: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"] },
        hour: { type: String, required: true, trim: true, match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/] }, // probar con Number , 'El formato de la hora debe ser HH:mm'
        place: { type: String, required: true, enum: ["Indoor", "Outdoor"] },
        image: { type: String, default: "../../assets/pista.jpg" },
        author: [{ type: mongoose.Types.ObjectId, ref: "users" }]
        // participantes max: 4
    },
    {
        timestamps: true,
        collection: "padelMatches"
    }
);

const PadelMatch = mongoose.model("padelMatches", padelMatchSchema, "padelMatches");

module.exports = PadelMatch;
