import {
  createGameRound,
  getRoundsBySession,
  getUserRoundStats,
} from "../models/gameRound.js";

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

export const createRoundController = async (req, res) => {
  const { sessionId, userNumber, machineNumber } = req.body;

  if (!sessionId || !userNumber || !machineNumber) {
    return res.status(400).json({
      success: false,
      message: "Session ID, user number and machine number are required",
    });
  }

  try {
    const round = await createGameRound(sessionId, userNumber, machineNumber);
    res.status(201).json({
      success: true,
      data: round,
    });
  } catch (error) {
    handleError(res, error, "Failed to create game round");
  }
};

export const getSessionRoundsController = async (req, res) => {
  const { sessionId } = req.params;

  try {
    const rounds = await getRoundsBySession(sessionId);
    res.status(200).json({
      success: true,
      data: rounds,
    });
  } catch (error) {
    handleError(res, error, "Failed to fetch session rounds");
  }
};

export const getUserStatsController = async (req, res) => {
  const { userId } = req.params;

  try {
    const stats = await getUserRoundStats(userId);
    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    handleError(res, error, "Failed to fetch user stats");
  }
};
