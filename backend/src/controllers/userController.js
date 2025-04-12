import {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  updatePassword,
  deleteUser,
} from "../models/user.js";

const handleError = (
  res,
  error,
  defaultMessage = "Error processing request"
) => {
  console.error(error);
  const statusCode = error.message.includes("not found") ? 404 : 500;
  res.status(statusCode).json({
    success: false,
    message: error.message || defaultMessage,
  });
};

export const createUserController = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Username, email and password are required",
    });
  }

  try {
    const user = await createUser({
      username,
      email,
      password_hash: password,
    });

    const { password_hash, ...userData } = user;

    res.status(201).json({
      success: true,
      data: userData,
    });
  } catch (error) {
    if (error.message.includes("already exists")) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }
    handleError(res, error, "Failed to create user");
  }
};

export const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();

    const safeUsers = users.map((user) => {
      const { password_hash, ...userData } = user;
      return userData;
    });
    res.status(200).json({
      success: true,
      data: safeUsers,
    });
  } catch (error) {
    handleError(res, error, "Failed to fetch users");
  }
};

export const getUserByIdController = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const { password_hash, ...userData } = user;

    res.status(200).json({
      success: true,
      data: userData,
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const updateUserController = async (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;

  if (!username || !email) {
    return res.status(400).json({
      success: false,
      message: "Username and email are required",
    });
  }

  try {
    const updatedUser = await updateUser(id, { username, email });

    const { password_hash, ...userData } = updatedUser;

    res.status(200).json({
      success: true,
      data: userData,
    });
  } catch (error) {
    if (error.message.includes("already exists")) {
      return res.status(409).json({
        success: false,
        message: "Email already in use",
      });
    }
    handleError(res, error, "Failed to update user");
  }
};

export const updatePasswordController = async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Current and new password are required",
    });
  }

  try {
    const updatedUser = await updatePassword(id, newPassword);
    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    handleError(res, error, "Failed to update password");
  }
};

export const deleteUserController = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await deleteUser(id);
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const { password_hash, ...userData } = deletedUser;

    res.status(200).json({
      success: true,
      data: userData,
      message: "User deleted successfully",
    });
  } catch (error) {
    handleError(res, error, "Failed to delete user");
  }
};
