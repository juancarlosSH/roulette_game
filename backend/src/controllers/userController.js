import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../models/user.js";

export const createUserController = async (req, res) => {
  const userData = req.body;

  try {
    const user = await createUser(userData);
    res.status(201).json(user);
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(500).send(error.message);
  }
};

export const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    res.status(500).send(error.message);
  }
};

export const getUserByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    res.status(404).send(error.message);
  }
};

export const updateUserController = async (req, res) => {
  const { id } = req.params;
  const userData = req.body;
  try {
    const updatedUser = await updateUser(id, userData);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    res.status(500).send(error.message);
  }
};

export const deleteUserController = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await deleteUser(id);
    res.status(200).json(deletedUser);
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    res.status(500).send(error.message);
  }
};
