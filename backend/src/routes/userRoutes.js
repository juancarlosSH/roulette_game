import express from "express";
import {
  createUserController,
  getAllUsersController,
  getUserByIdController,
  getHighScoresController,
  updateUserController,
  deleteUserController,
} from "../controllers/userController.js";

const router = express.Router();

// Create a user
router.post("/users", createUserController);

// Get all users
router.get("/users", getAllUsersController);

// Get a user by ID
router.get("/users/:id", getUserByIdController);

// Get top users by high_score
router.get("/high-scores", getHighScoresController);

// Update a user
router.put("/users/:id", updateUserController);

// Delete a user
router.delete("/users/:id", deleteUserController);

export default router;
