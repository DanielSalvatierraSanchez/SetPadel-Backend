const mongoose = require("mongoose");

const padelMatchSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        location: { type: String, required: true, trim: true },
        date: { type: Date, required: true, trim: true },
        place: { type: String, required: false, enum: ["Indoor", "Outdoor"] },
        image: { type: String, default: "../../assets/pista.jpg" },
        author: { type: mongoose.Types.ObjectId, ref: "users" },
        players: [{ userId: { type: mongoose.Types.ObjectId, ref: "users" }, userName: { type: String, required: true } }], // participantes max: 4
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
