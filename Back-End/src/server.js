require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const axios = require("axios");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const routesRouter = require("./routes/routes");
const { initializeDatabase } = require("./config/database");

const app = express();
const PORT = process.env.PORT || 3000;

// 🌍 Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests
app.use(morgan("dev")); // Logging

// ⏳ Rate Limiting (prevents API abuse)
const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // Limit each IP to 60 requests per window
  message: { error: "Too many requests, please try again later." },
});
app.use("/api/", apiLimiter);

// 🛣️ Routes
app.use("/api/routes", routesRouter);

// 🌦️ Weather API Route
app.get("/api/weather", async (req, res) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
      return res.status(400).json({ error: "Latitude and Longitude are required" });
    }

    const apiKey = process.env.WEATHER_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Weather API key is missing in environment variables." });
    }

    const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`;
    const response = await axios.get(weatherUrl);

    res.json(response.data);
  } catch (error) {
    console.error(`[ERROR] Failed to fetch weather data: ${error.message}`);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

// 🔴 Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${err.stack}`);
  res.status(500).json({ error: "Something went wrong!" });
});

// 🚀 Initialize Database & Start Server
(async () => {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
      console.log(`[✅] Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`[ERROR] Database initialization failed: ${error.message}`);
    process.exit(1);
  }
})();
