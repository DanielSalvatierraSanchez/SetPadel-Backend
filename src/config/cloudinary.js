const cloudinary = require("cloudinary").v2;

const connnectCloudinary = () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        });
        console.log("✅ Conectado a CLoudinary");
    } catch (error) {
        console.log("❌ Error en Cloudinary", error);
    }
};

module.exports = { connnectCloudinary };
