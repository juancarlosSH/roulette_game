import express from "express";
import {
  createGameController,
  getAllGamesController,
  getGameByIdController,
  updateGameController,
  deleteGameController,
} from "../controllers/gameController.js";

const router = express.Router();

// Create a new game
router.post("/games", createGameController);

// Get all games
router.get("/games", getAllGamesController);

// Get a game by ID
router.get("/games/:id", getGameByIdController);

// Update a game
router.put("/games/:id", updateGameController);

// Delete a game
router.delete("/games/:id", deleteGameController);

export default router;
