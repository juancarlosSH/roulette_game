import express from "express";
import pg from "pg";

const { Pool } = pg;

const app = express();
const port = process.env.PORT || 3000;

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

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
