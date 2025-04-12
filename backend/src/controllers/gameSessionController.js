import {
  createGameSession,
  updateGameSession,
  getSessionsByUser,
  getSessionById,
} from "../models/gameSession.js";

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

export const createSessionController = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "User ID is required",
    });
  }

  try {
    const session = await createGameSession(userId);
    res.status(201).json({
      success: true,
      data: session,
    });
  } catch (error) {
    handleError(res, error, "Failed to create game session");
  }
};

export const updateSessionController = async (req, res) => {
  const { sessionId } = req.params;
  const { finalScore, roundsPlayed } = req.body;

  if (!finalScore || !roundsPlayed) {
    return res.status(400).json({
      success: false,
      message: "Final score and rounds played are required",
    });
  }

  try {
    const updatedSession = await updateGameSession(
      sessionId,
      finalScore,
      roundsPlayed
    );
    res.status(200).json({
      success: true,
      data: updatedSession,
    });
  } catch (error) {
    handleError(res, error, "Failed to update game session");
  }
};

export const getUserSessionsController = async (req, res) => {
  const { userId } = req.params;

  try {
    const sessions = await getSessionsByUser(userId);
    res.status(200).json({
      success: true,
      data: sessions,
    });
  } catch (error) {
    handleError(res, error, "Failed to fetch user sessions");
  }
};

export const getSessionDetailsController = async (req, res) => {
  const { sessionId } = req.params;

  try {
    const session = await getSessionById(sessionId);
    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
      });
    }

    res.status(200).json({
      success: true,
      data: session,
    });
  } catch (error) {
    handleError(res, error);
  }
};
