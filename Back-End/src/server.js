require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const axios = require("axios");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const routesRouter = require("./routes/routes");
// const { initializeDatabase } = require("./config/database");

const app = express();
const PORT = process.env.PORT || 3000;

// 🌍 Middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: ['https://green-ride-one.vercel.app/'],
  methods: ['GET', 'POST'],
  credentials: true
}));// Enable CORS
app.use(express.json()); // Parse JSON requests
app.use(morgan("dev")); // Logging

// ⏳ Rate Limiting (prevents API abuse)
const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // Limit each IP to 60 requests per window
  message: { error: "Too many requests, please try again later." },
});
app.use("/api/", apiLimiter);

//  Routes
app.use("/api/routes", routesRouter);



//  Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${err.stack}`);
  res.status(500).json({ error: "Something went wrong!" });
});

//  Initialize Database & Start Server
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`[✅] Server is running on port ${PORT}`);
  });
}
module.exports = app;