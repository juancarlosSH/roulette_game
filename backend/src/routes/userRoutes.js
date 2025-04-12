import express from "express";
import {
  createUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
  updatePasswordController,
  deleteUserController,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", createUserController);

router.get("/", getAllUsersController);
router.get("/:id", getUserByIdController);
router.put("/:id", updateUserController);
router.patch("/:id/password", updatePasswordController);
router.delete("/:id", deleteUserController);

export default router;
