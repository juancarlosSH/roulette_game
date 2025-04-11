import express from "express";
import {
  createUserController,
  getAllUsersController,
  getUserByIdController,
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

// Update a user
router.put("/users/:id", updateUserController);

// Delete a user
router.delete("/users/:id", deleteUserController);

export default router;
