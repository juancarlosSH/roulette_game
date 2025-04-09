import express from "express";
import pg from "pg";
import userRoutes from "./routes/userRoutes.js"; // Importar las rutas de usuarios
import gameRoutes from "./routes/gameRoutes.js"; // Importar las rutas de juegos

const { Pool } = pg;

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Para poder procesar el cuerpo de las solicitudes en formato JSON

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
    res.send(
      `¡Hola desde el backend! Hora actual del servidor: ${result.rows[0].now}`
    );
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
    res.status(500).send("Error al conectar con la base de datos");
  }
});

// Prefijar las rutas con "/api"
app.use("/api/users", userRoutes); // Usar las rutas de usuarios
app.use("/api/games", gameRoutes); // Usar las rutas de juegos

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(500)
    .send({ error: "Algo salió mal, inténtalo de nuevo más tarde." });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
