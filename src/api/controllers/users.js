const bcrypt = require("bcrypt");
const User = require("../models/users");
const { generateToken } = require("../../utils/jwt");
const { idAndRoleChecked } = require("../../utils/checkId&Role");
const { deleteImage } = require("../../utils/deleteImage");
const { resultUsersByName } = require("../../utils/Users/resultUsersByName");
const { resultUsersByPhone } = require("../../utils/Users/resultUsersByPhone");
const { resultUserDeleted } = require("../../utils/Users/resultUserDeleted");
const { registerUserControlDuplicated } = require("../../utils/Users/registerUserControlDuplicated");
const { selectUserData } = require("../../utils/Users/selectUserData");
const { ParamsErrorOfUser } = require("../../utils/Users/ParamsErrorOfUser");

const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, phone } = req.body;

        const userDuplicated = await User.findOne({ $or: [{ email }, { phone }] });
        const errorDuplicated = registerUserControlDuplicated(userDuplicated, email, phone);
        if (userDuplicated) {
            if (req.file) {
                deleteImage(req.file?.path);
            }
            return res.status(400).json({ message: errorDuplicated });
        }

        const userParamsError = ParamsErrorOfUser(name, password, phone, email);
        if (userParamsError) {
            if (req.file) {
                deleteImage(req.file?.path);
            }
            return res.status(400).json({ message: userParamsError });
        }

        const newUser = new User(req.body);
        if (req.file) {
            newUser.image = req.file.path;
        } else {
            newUser.image = "https://cdn-icons-png.flaticon.com/512/1177/1177568.png";
        }

        const token = generateToken(newUser._id);

        const userSaved = await newUser.save();

        return res.status(201).json({ message: "Usuario creado correctamente.", user: userSaved, token });
    } catch (error) {
        return res.status(400).json({ message: "❌ Fallo en registerUser:", error: error.message });
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userLogin = await User.findOne({ email });

        if (!userLogin) {
            return res.status(400).json({ message: "Email o Contraseña incorrectos." });
        }
        if (bcrypt.compareSync(password, userLogin.password)) {
            const token = generateToken(userLogin._id);
            return res.status(200).json({ message: "LOGIN realizado correctamente.", user: userLogin, token });
        } else {
            return res.status(400).json({ message: "Email o Contraseña incorrectos." });
        }
    } catch (error) {
        return res.status(400).json({ message: "❌ Fallo en loginUser:", error: error.message });
    }
};

const verifyTokenUser = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "❌ Token o usuario no válido" });
        }
        return res.status(200).json({ message: "✅ Token válido", user: req.user });
    } catch (error) {
        return res.status(400).json({ message: "❌ Fallo en verifyTokenUser:", error: error.message });
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const user = req.user;
        const allUsers = await User.find().select(selectUserData(user)).populate("padelMatches");
        return res.status(200).json({ message: "Listado completo de usuarios:", allUsers });
    } catch (error) {
        return res.status(400).json({ message: "❌ Fallo en getAllUsers:", error: error.message });
    }
};

const getUserByName = async (req, res, next) => {
    try {
        const user = req.user;
        const { name } = req.params;
        const searchUserByName = await User.find({ name: new RegExp(name, "i") })
            .select(selectUserData(user))
            .populate("padelMatches");
        resultUsersByName(res, searchUserByName, name);
    } catch (error) {
        return res.status(400).json({ message: "❌ Fallo en getUserByName:", error: error.message });
    }
};

const getUserByPhone = async (req, res, next) => {
    try {
        const user = req.user;
        const { phone } = req.params;
        if (phone.length !== 9) {
            return res.status(400).json("Introduce un número de teléfono de 9 digitos.");
        }
        const searchUserByPhone = await User.find({ phone }).select(selectUserData(user)).populate("padelMatches");
        resultUsersByPhone(res, searchUserByPhone, phone);
    } catch (error) {
        return res.status(400).json({ message: "❌ Fallo en getUserByPhone:", error: error.message });
    }
};

const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, email, password, phone, padelMatches } = req.body;
        const user = req.user;

        const userChecked = idAndRoleChecked(id, user);
        if (userChecked) {
            return res.status(400).json({ message: userChecked });
        }

        const userDuplicated = await User.findOne({ $or: [{ email }, { phone }] });
        const errorDuplicated = registerUserControlDuplicated(userDuplicated, email, phone);
        if (userDuplicated) {
            return res.status(400).json({ message: errorDuplicated });
        }

        const oldUser = await User.findById(id);
        const userModify = new User(req.body);
        userModify._id = id;

        if (!name && !password && !phone && !req.file) {
            return res.status(400).json({ message: "No hay cambios pendientes." });
        }
        if (name) {
            if (name.length < 2 || name.length > 20) {
                return res.status(400).json({ message: "El nombre debe de tener de 2 a 20 caracteres." });
            }
        }
        if (password) {
            if (password.length < 8 || password.length > 16) {
                return res.status(400).json({ message: "La contraseña debe de tener entre 8 y 16 caracteres." });
            }
            const newPassword = bcrypt.hashSync(password, 10);
            userModify.password = newPassword;
        }
        if (phone) {
            if (phone.length < 9 || phone.length > 9) {
                return res.status(400).json({ message: "El teléfono debe de tener 9 dígitos." });
            }
        }
        if (req.file) {
            if (oldUser.image) {
                deleteImage(oldUser.image);
            }
            userModify.image = req.file.path;
        }

        const userUpdated = await User.findByIdAndUpdate(id, userModify, { new: true });
        return res.status(200).json({ message: "Datos del usuario actualizados correctamente.", userUpdated });
    } catch (error) {
        return res.status(400).json({ message: "❌ Fallo en updateUser:", error: error.message });
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = req.user;

        const userChecked = idAndRoleChecked(id, user);
        if (userChecked) {
            return res.status(400).json({ message: userChecked });
        }

        const userDeleted = await User.findByIdAndDelete(id);
        deleteImage(userDeleted.image);
        resultUserDeleted(res, userDeleted);
    } catch (error) {
        return res.status(400).json({ message: "❌ Fallo en deleteUser:", error: error.message });
    }
};

module.exports = { registerUser, loginUser, verifyTokenUser, getAllUsers, getUserByName, getUserByPhone, updateUser, deleteUser };
