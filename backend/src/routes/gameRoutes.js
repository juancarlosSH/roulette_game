import express from "express";
import {
  createGameController,
  getAllGamesController,
  getGameByIdController,
  getTopScoresController,
  updateGameController,
  deleteGameController,
} from "../controllers/gameController.js";

const router = express.Router();

// Create a new game
router.post("/", createGameController);

// Get all games
router.get("/", getAllGamesController);

// Get top scores
router.get("/top-scores", getTopScoresController);

// Get a game by ID
router.get("/:id", getGameByIdController);

// Update a game
router.put("/:id", updateGameController);

// Delete a game
router.delete("/:id", deleteGameController);

export default router;
