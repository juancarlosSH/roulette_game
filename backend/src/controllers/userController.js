import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../models/user.js";

export const createUserController = async (req, res) => {
  const userData = req.body;

  // If `high_score` is not provided, set it to 0 by default
  userData.high_score = userData.high_score || 0;

  try {
    const user = await createUser(userData);
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating the user:", error);
    res.status(500).send(error.message);
  }
};

export const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send(error.message);
  }
};

export const getUserByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching the user:", error);
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
    console.error("Error updating the user:", error);
    res.status(500).send(error.message);
  }
};

export const deleteUserController = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await deleteUser(id);
    res.status(200).json(deletedUser);
  } catch (error) {
    console.error("Error deleting the user:", error);
    res.status(500).send(error.message);
  }
};
