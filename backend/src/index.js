import express from "express";
import pg from "pg";
import userRoutes from "./routes/userRoutes.js"; // Import user routes
import gameRoutes from "./routes/gameRoutes.js"; // Import game routes

const { Pool } = pg;

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Enable JSON request body parsing

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.send(`Hello from the backend! Server time: ${result.rows[0].now}`);
  } catch (error) {
    console.error("Error connecting to the database:", error);
    res.status(500).send("Error connecting to the database");
  }
});

// Prefix routes with "/api"
app.use("/api/users", userRoutes); // Use user routes
app.use("/api/games", gameRoutes); // Use game routes

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(500)
    .send({ error: "Something went wrong, please try again later." });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
