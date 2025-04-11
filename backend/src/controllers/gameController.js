import {
  createGame,
  getAllGames,
  getGameById,
  getTopScores,
  updateGame,
  deleteGame,
} from "../models/game.js";

export const createGameController = async (req, res) => {
  const gameData = req.body;
  try {
    const game = await createGame(gameData);
    res.status(201).json(game);
  } catch (error) {
    console.error("Error creating the game:", error);
    res.status(500).send(error.message);
  }
};

export const getAllGamesController = async (req, res) => {
  try {
    const games = await getAllGames();
    res.status(200).json(games);
  } catch (error) {
    console.error("Error fetching games:", error);
    res.status(500).send(error.message);
  }
};

export const getGameByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const game = await getGameById(id);
    res.status(200).json(game);
  } catch (error) {
    console.error("Error fetching the game:", error);
    res.status(404).send(error.message);
  }
};

export const getTopScoresController = async (req, res) => {
  try {
    const topScores = await getTopScores();
    res.status(200).json(topScores);
  } catch (error) {
    console.error("Error fetching top scores:", error);
    res.status(500).send(error.message);
  }
};

export const updateGameController = async (req, res) => {
  const { id } = req.params;
  const gameData = req.body;
  try {
    const updatedGame = await updateGame(id, gameData);
    res.status(200).json(updatedGame);
  } catch (error) {
    console.error("Error updating the game:", error);
    res.status(500).send(error.message);
  }
};

export const deleteGameController = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedGame = await deleteGame(id);
    res.status(200).json(deletedGame);
  } catch (error) {
    console.error("Error deleting the game:", error);
    res.status(500).send(error.message);
  }
};
