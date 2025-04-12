import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import userRoutes from "./routes/userRoutes.js";
import gameRoutes from "./routes/gameRoutes.js";
import { pool } from "./models/db.js";

const app = express();
const port = process.env.PORT || 3000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(helmet());
app.use(limiter);
app.use(express.json({ limit: "10kb" }));

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      message: "Roulette Game API",
      dbStatus: "connected",
      serverTime: result.rows[0].now,
      apiEndpoints: {
        users: "/api/users",
        games: "/api/games",
      },
    });
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(503).json({
      message: "Roulette Game API - Maintenance",
      dbStatus: "disconnected",
      error: error.message,
    });
  }
});

app.use("/api/users", userRoutes);
app.use("/api/games", gameRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
  });
});

app.use((err, req, res, next) => {
  console.error("Global error handler:", err);

  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? "Internal server error" : err.message;

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

app
  .listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  })
  .on("error", (err) => {
    console.error("Server failed to start:", err);
  });

process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully");
  pool.end(() => {
    console.log("Database pool closed");
    process.exit(0);
  });
});
