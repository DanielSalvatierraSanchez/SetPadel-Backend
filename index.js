require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./src/config/db");
const padelMatchesRoutes = require("./src/api/routes/padelMatches");
const usersRoutes = require("./src/api/routes/users");
const { connnectCloudinary } = require("./src/config/cloudinary");

const app = express();
connectDB();
connnectCloudinary();

app.use(cors());
app.use(express.json());

app.use("/api/v1/appadel/matches", padelMatchesRoutes);
app.use("/api/v1/appadel/users", usersRoutes);

app.use("*", (req, res, next) => {
    return res.status(404).json("✅ Route Not Found");
});

app.listen(3000, () => {
    console.log("✅ Server is up 🚀 http://localhost:3000");
});
