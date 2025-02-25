const { idAndRoleChecked, authorIdChecked } = require("../../utils/checkId&Role");
const { deleteImage } = require("../../utils/deleteImage");
const { ParamsErrorOfPadelMatch } = require("../../utils/PadelMatches/ParamsErrorOfPadelMatch");
const { resultPadelMatchDeleted } = require("../../utils/PadelMatches/resultPadelMatchDeleted");
const { resultPadelMatchesByAuthor } = require("../../utils/PadelMatches/resultPadelMatchesByAuthor");
const { resultPadelMatchesByDay } = require("../../utils/PadelMatches/resultPadelMatchesByDate");
const PadelMatch = require("../models/padelMatches");
const User = require("../models/users");

const createPadelMatch = async (req, res, next) => {
    try {
        const { title, location, date, place } = req.body;

        const padelMatchParamsError = ParamsErrorOfPadelMatch(title, location, date, place);
        if (padelMatchParamsError) {
            if (req.file) {
                deleteImage(req.file?.path);
            }
            return res.status(400).json({ message: padelMatchParamsError });
        }

        const authorId = await User.findById(req.user);
        const newPadelMatch = new PadelMatch({ ...req.body, author: authorId._id, authorName: authorId.name });

        if (req.file) {
            newPadelMatch.image = req.file.path;
        }

        const padelMatchSaved = await newPadelMatch.save();
        return res.status(201).json({ message: "Partido creado.", padelMatchSaved });
    } catch (error) {
        return res.status(400).json({ message: "❌ Fallo en createPadelMatch:", error });
    }
};

const joinUserToPadelMatch = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const userName = req.user.name;

        const padelMatch = await PadelMatch.findById(id);
        if (!padelMatch) {
            return res.status(404).json({ message: "Partido no encontrado." });
        }

        if (padelMatch.players.includes(userId)) {
            return res.status(200).json({ message: "¡Ya estás apuntado!" });
        }

        if (padelMatch.players.length >= 4) {
            padelMatch.isCompleted = true;
            return res.status(200).json({ message: "¡Partido Completo!" });
        }

        padelMatch.players.push({ userId, userName });

        const updatePadelMatch = await padelMatch.save();
        return res.status(200).json({ message: "¡Apuntado!", updatePadelMatch });
    } catch (error) {
        return res.status(400).json({ message: "❌ Fallo en joinPadelMatch:" });
    }
};

const getPadelMatches = async (req, res, next) => {
    try {
        const allPadelMatches = await PadelMatch.find().populate("author", "_id name email image").sort({ date: 1 });
        if (allPadelMatches.length == 0) {
            return res.status(200).json({ message: "❌ No hay ningún partido programado." });
        }
        return res.status(200).json({ message: "Estos son todos los partidos que hay programados:", allPadelMatches });
    } catch (error) {
        return res.status(400).json({ message: "❌ Fallo en getPadelMatches:" });
    }
};

const getPadelMatchByDay = async (req, res, next) => {
    try {
        const { day } = req.params;
        const findPadelMatch = await PadelMatch.find({ day });
        resultPadelMatchesByDay(res, findPadelMatch, day);
    } catch (error) {
        return res.status(400).json({ message: "❌ Fallo en getPadelMatchByDay:", error });
    }
};

const getPadelMatchByAuthor = async (req, res, next) => {
    try {
        const { author } = req.params;
        const findPadelMatch = await PadelMatch.find({ author });
        resultPadelMatchesByAuthor(res, findPadelMatch, author);
    } catch (error) {
        return res.status(400).json({ message: "❌ Fallo en getPadelMatchByAuthor:", error });
    }
};

const updatePadelMatch = async (req, res, next) => {
    try {
        const { matchId } = req.params;
        const { title, location, date, place } = req.body;
        const user = req.user;

        const oldPadelMatch = await PadelMatch.findById(matchId);
        if (!oldPadelMatch) {
            return res.status(400).json({ message: "Partido no encontrado." });
        }

        const authorChecked = authorIdChecked(user, oldPadelMatch);
        if (authorChecked) {
            return res.status(400).json({ message: authorChecked });
        }

        const padelMatchParamsError = ParamsErrorOfPadelMatch(title, location, date, place);
        if (padelMatchParamsError) {
            if (req.file) {
                deleteImage(req.file?.path);
            }
            return res.status(400).json({ message: padelMatchParamsError });
        }

        const padelMatchModify = new PadelMatch(req.body);
        padelMatchModify._id = matchId;
        padelMatchModify.author = oldPadelMatch.author;

        if (req.file) {
            if (oldPadelMatch.image) {
                deleteImage(oldPadelMatch.image);
            }
            padelMatchModify.image = req.file.path;
        }

        const padelMatchUpdated = await PadelMatch.findByIdAndUpdate(matchId, padelMatchModify, { new: true });
        return res.status(200).json({ message: "Partido actualizado correctamente.", padelMatchUpdated });
    } catch (error) {
        return res.status(400).json({ message: "❌ Fallo en updatePadelMatch:", error });
    }
};

const deletePadelMatch = async (req, res, next) => {
    try {
        const { matchId } = req.params;

        const findPadelMatch = await PadelMatch.findById(matchId);
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
        return res.status(400).json({ message: "❌ Fallo en deletePadelMatch:", error });
    }
};

const deleteUserOfPadelMatch = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const padelMatch = await PadelMatch.findById(id);
        if (!padelMatch) {
            return res.status(400).json({ message: "Partido no encontrado." });
        }

        const playerIndex = padelMatch.players.findIndex((player) => player.userId.toString() === userId.toString());
        if (playerIndex === -1) {
            return res.status(400).json({ message: "No estás apuntado." });
        }

        padelMatch.players.splice(playerIndex, 1);

        const updateUsersOfPadelMatch = await padelMatch.save();
        return res.status(200).json({ message: "¡Te retiraste!", updateUsersOfPadelMatch });
    } catch (error) {
        return res.status(400).json({ message: `❌ Fallo en deleteUserOfPadelMatch: ${error.message}` });
    }
};

module.exports = {
    createPadelMatch,
    joinUserToPadelMatch,
    getPadelMatches,
    getPadelMatchByDay,
    getPadelMatchByAuthor,
    updatePadelMatch,
    deletePadelMatch,
    deleteUserOfPadelMatch
};
