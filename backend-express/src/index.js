import express from "express";
import cors from "cors";
import gameRoutes from "./routes/gameRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("¡Hola mundo desde Express!");
});

app.use("/api/games", gameRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
