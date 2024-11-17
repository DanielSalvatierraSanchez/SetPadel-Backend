const User = require("../api/models/users");
const { verifyToken } = require("../utils/jwt");

const isAuth = async (req, res, next) => {
    try {
        const token = await req.headers.authorization;
        const modifyToken = await token.replace("Bearer ", "");

        const { id } = verifyToken(modifyToken);

        const user = await User.findById(id);
        user.password = null;
        req.user = user;
        next();
    } catch (error) {
        return res.status(400).json({ message: "❌ Primero debes de hacer el Login." });
    }
};

module.exports = { isAuth };
