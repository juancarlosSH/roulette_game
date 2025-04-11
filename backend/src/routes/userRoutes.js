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
router.post("/", createUserController);

// Get all users
router.get("/", getAllUsersController);

// Get a user by ID
router.get("/:id", getUserByIdController);

// Update a user
router.put("/:id", updateUserController);

// Delete a user
router.delete("/:id", deleteUserController);

export default router;
