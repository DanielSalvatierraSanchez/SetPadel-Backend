const { isAuth } = require("../../middlewares/isAuth");
const uploadFolders = require("../../middlewares/uploadFolders");
const { registerUser, loginUser, verifyTokenUser, getAllUsers, getUserByName, getUserByPhone, updateUser, deleteUser } = require("../controllers/users");
const usersRoutes = require("express").Router();

usersRoutes.post("/register", uploadFolders("Users_Of_Appadel").single("image"), registerUser);
usersRoutes.post("/login", loginUser);
usersRoutes.get("/getByName/:name", isAuth, getUserByName);
usersRoutes.get("/getByPhone/:phone", isAuth, getUserByPhone);
usersRoutes.get("/", isAuth, getAllUsers);
usersRoutes.get("/verify_token", isAuth, verifyTokenUser);
usersRoutes.put("/update/:id", isAuth, uploadFolders("Users_Of_Appadel").single("image"), updateUser);
usersRoutes.delete("/delete/:id", isAuth, deleteUser);

module.exports = usersRoutes;
