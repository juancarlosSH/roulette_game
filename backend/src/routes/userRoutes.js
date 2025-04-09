import express from "express";
import {
  createUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/users", createUserController); // Crear usuario
router.get("/users", getAllUsersController); // Obtener todos los usuarios
router.get("/users/:id", getUserByIdController); // Obtener usuario por ID
router.put("/users/:id", updateUserController); // Actualizar usuario
router.delete("/users/:id", deleteUserController); // Eliminar usuario

export default router;
