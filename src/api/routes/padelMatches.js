const padelMatchesRoutes = require("express").Router();
const { isAuth } = require("../../middlewares/isAuth");
const uploadFolders = require("../../middlewares/uploadFolders");
const { createPadelMatch, getPadelMatchByDay, getPadelMatchByAuthor, getPadelMatches, updatePadelMatch, deletePadelMatch } = require("../controllers/padelMatches");

padelMatchesRoutes.post("/register", isAuth, uploadFolders("Padel_Matches_Of_Appadel").single("image"), createPadelMatch);
padelMatchesRoutes.get("/getByDay/:day", isAuth, getPadelMatchByDay);
padelMatchesRoutes.get("/getByAuthor/:author", isAuth, getPadelMatchByAuthor);
padelMatchesRoutes.get("/", getPadelMatches); // isAuth,
padelMatchesRoutes.put("/update/:id", isAuth, updatePadelMatch);
padelMatchesRoutes.delete("/delete/:id", isAuth, deletePadelMatch);

module.exports = padelMatchesRoutes;
