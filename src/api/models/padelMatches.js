const mongoose = require("mongoose");

const padelMatchSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        location: { type: String, required: true, trim: true },
        day: { type: Number, required: true, min: 1, max: 31 },
        month: { type: String, required: true, trim: true, enum: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"] },
        // month: { type: Number, required: true, min: 1, max: 12 },
        hour: { type: String, required: true, trim: true, match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/] }, // probar con Number , 'El formato de la hora debe ser HH:mm'
        place: { type: String, required: true, enum: ["Indoor", "Outdoor"] },
        image: { type: String, default: "../../assets/pista.jpg" },
        author: [{ type: mongoose.Types.ObjectId, ref: "users" }]
    },
    {
        timestamps: true,
        collection: "padelMatches"
    }
);

const PadelMatch = mongoose.model("padelMatches", padelMatchSchema, "padelMatches");

module.exports = PadelMatch;
