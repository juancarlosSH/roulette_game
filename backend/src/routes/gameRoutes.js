import express from "express";
import {
  createGameController,
  getAllGamesController,
  getGameByIdController,
  updateGameController,
  deleteGameController,
} from "../controllers/gameController.js";

const router = express.Router();

// Crear una partida
router.post("/games", createGameController);

// Obtener todas las partidas
router.get("/games", getAllGamesController);

// Obtener una partida por ID
router.get("/games/:id", getGameByIdController);

// Actualizar una partida
router.put("/games/:id", updateGameController);

// Eliminar una partida
router.delete("/games/:id", deleteGameController);

export default router;
