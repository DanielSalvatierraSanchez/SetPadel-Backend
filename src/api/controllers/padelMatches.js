const { idAndRoleChecked } = require("../../utils/checkId&Role");
const { deleteImage } = require("../../utils/deleteImage");
const { ParamsErrorOfPadelMatch } = require("../../utils/ParamsErrorOfPadelMatch");
const { resultPadelMatchDeleted } = require("../../utils/resultPadelMatchDeleted");
const { resultPadelMatchesByAuthor } = require("../../utils/resultPadelMatchesByAuthor");
const { resultPadelMatchesByDay } = require("../../utils/resultPadelMatchesByDate");
const PadelMatch = require("../models/padelMatches");
const User = require("../models/users");

const createPadelMatch = async (req, res, next) => {
    try {
        const { day, month, hour, place, author } = req.body;

        const padelMatchParamsError = ParamsErrorOfPadelMatch(day, month, hour, place);
        if (padelMatchParamsError) {
            return res.status(400).json({ message: padelMatchParamsError });
        }

        const authorId = await User.findById(req.user);

        const newPadelMatch = new PadelMatch({ ...req.body, author: authorId._id });

        if (req.file) {
            newPadelMatch.image = req.file.path;
        }

        const padelMatchSaved = await newPadelMatch.save();
        return res.status(201).json({ message: "Partido creado.", padelMatchSaved });
    } catch (error) {
        return res.status(400).json(`❌ Fallo en createPadelMatch: ${error.message}`);
    }
};

const getPadelMatches = async (req, res, next) => {
    try {
        const allPadelMatches = await PadelMatch.find();
        return allPadelMatches
            ? res.status(200).json({ message: "Estos son todos los partidos que hay programados:", allPadelMatches })
            : res.status(400).json({ message: "No hay ningún partido programado." });
    } catch (error) {
        return res.status(400).json(`❌ Fallo en getPadelMatches: ${error.message}`);
    }
};

const getPadelMatchByDay = async (req, res, next) => {
    try {
        const { day } = req.params;
        const findPadelMatch = await PadelMatch.find({ day });
        resultPadelMatchesByDay(res, findPadelMatch, day);
    } catch (error) {
        return res.status(400).json(`❌ Fallo en getPadelMatchByDay: ${error.message}`);
    }
};

const getPadelMatchByAuthor = async (req, res, next) => {
    try {
        const { author } = req.params;
        const findPadelMatch = await PadelMatch.find({ author });
        resultPadelMatchesByAuthor(res, findPadelMatch, author);
    } catch (error) {
        return res.status(400).json(`❌ Fallo en getPadelMatchByAuthor: ${error.message}`);
    }
};

const updatePadelMatch = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, location, day, month, hour, place, image } = req.body;
        const user = req.user;

        const userChecked = idAndRoleChecked(user);
        if (userChecked) {
            return res.status(400).json({ message: userChecked });
        }

        ParamsErrorOfPadelMatch(day, month, hour, place);

        const oldPadelMatch = await PadelMatch.findById(id);
        // if (!oldPadelMatch) {
        //     return res.status(400).json({ message: "Partido no encontrado." });
        // }

        const padelMatchModify = new PadelMatch(req.body);
        padelMatchModify._id = id;
        padelMatchModify.author = oldPadelMatch.author;

        if (req.file) {
            deleteImage(oldPadelMatch.image);
            padelMatchModify.image = req.file.path;
        }

        const padelMatchUpdated = await PadelMatch.findByIdAndUpdate(id, padelMatchModify, { new: true });
        return res.status(200).json({ message: "Partido actualizado correctamente.", padelMatchUpdated });
    } catch (error) {
        return res.status(400).json(`❌ Fallo en updatePadelMatch: ${error.message}`);
    }
};

const deletePadelMatch = async (req, res, next) => {
    try {
        const { id } = req.params;

        const findPadelMatch = await PadelMatch.findById(id);
        if (!findPadelMatch) {
            return res.status(400).json({ message: "No existe ese partido." });
        }

        const authorPadelMatch = await User.findById(req.user);
        const authorIDPadelMatch = findPadelMatch.author.toString();

        const userChecked = idAndRoleChecked(authorIDPadelMatch, authorPadelMatch);
        if (userChecked) {
            return res.status(400).json({ message: userChecked });
        }

        const padelMatchDeleted = await PadelMatch.findByIdAndDelete(id);
        deleteImage(padelMatchDeleted.image);
        resultPadelMatchDeleted(res, padelMatchDeleted);
    } catch (error) {
        return res.status(400).json(`❌ Fallo en deletePadelMatch: ${error.message}`);
    }
};

module.exports = {
    createPadelMatch,
    getPadelMatches,
    getPadelMatchByDay,
    getPadelMatchByAuthor,
    updatePadelMatch,
    deletePadelMatch
};
