const mongoose = require("mongoose");

const padelMatchSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        location: { type: String, required: true, trim: true },
        date: { type: Date, required: true, trim: true },
        place: { type: String, required: false, enum: ["Indoor", "Outdoor"] },
        image: { type: String, default: "../../assets/pista.jpg" },
        author: { type: mongoose.Types.ObjectId, ref: "users" },
        players: [{ type: mongoose.Types.ObjectId, ref: "users" }], // participantes max: 4
        isCompleted: { type: Boolean, default: false }
    },
    {
        timestamps: true,
        collection: "padelMatches"
    }
);

padelMatchSchema.pre("save", function (next) {
    if (this.date) {
        const originalDate = new Date(this.date);
        this.date = new Date(originalDate.getTime() + 60 * 60 * 1000);
    }
    next();
});

padelMatchSchema.index({ date: 1 }, { expireAfterSeconds: 0 });

const PadelMatch = mongoose.model("padelMatches", padelMatchSchema, "padelMatches");

module.exports = PadelMatch;

/*
    day: { type: String, required: true }, // estaba como Number
    month: { type: String, required: true, trim: true, enum: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"] },
    hour: { type: String, required: true, trim: true, match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/] }, // probar con Number , 'El formato de la hora debe ser HH:mm'
*/
