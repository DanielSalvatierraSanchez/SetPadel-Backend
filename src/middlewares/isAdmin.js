const User = require("../api/models/users");
const { verifyToken } = require("../utils/jwt");

const isAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const modifyToken = await token.replace("Bearer ", "");

        const { id } = verifyToken(modifyToken);

        const user = await User.findById(id);
        if (user.role === "admin") {
            user.password = null;
            req.user = user;
            next();
        } else {
            return res.status(400).json({ message: "Necesitas tener permisos de Administrador." });
        }
    } catch (error) {
        return res.status(400).json({ message: "❌ No tienes permisos." }); 
    }
};

module.exports = { isAdmin };
