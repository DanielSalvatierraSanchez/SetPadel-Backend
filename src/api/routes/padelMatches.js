const padelMatchesRoutes = require("express").Router();
const { isAuth } = require("../../middlewares/isAuth");
const uploadFolders = require("../../middlewares/uploadFolders");
const {
    createPadelMatch,
    joinUserToPadelMatch,
    getPadelMatchByDay,
    getPadelMatchByAuthor,
    getPadelMatches,
    updatePadelMatch,
    deletePadelMatch,
    deleteUserOfPadelMatch
} = require("../controllers/padelMatches");

padelMatchesRoutes.post("/register", isAuth, uploadFolders("Padel_Matches_Of_Appadel").single("image"), createPadelMatch);
padelMatchesRoutes.get("/getByDay/:day", isAuth, getPadelMatchByDay);
padelMatchesRoutes.get("/getByAuthor/:author", isAuth, getPadelMatchByAuthor);
padelMatchesRoutes.get("/", isAuth, getPadelMatches);
padelMatchesRoutes.put("/join/:id", isAuth, joinUserToPadelMatch);
padelMatchesRoutes.put("/update/:id", isAuth, uploadFolders("Padel_Matches_Of_Appadel").single("image"), updatePadelMatch);
padelMatchesRoutes.put("/deleteUserOfPadelMatch/:id", isAuth, deleteUserOfPadelMatch);
padelMatchesRoutes.delete("/delete/:id", isAuth, deletePadelMatch);

module.exports = padelMatchesRoutes;
