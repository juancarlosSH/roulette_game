import pg from "pg";

const { Pool } = pg;
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Create a new game
const createGame = async (gameData) => {
  const { user_id, score } = gameData;
  const query = `
    INSERT INTO games (user_id, score)
    VALUES ($1, $2)
    RETURNING *;
  `;
  try {
    const res = await pool.query(query, [user_id, score]);
    return res.rows[0]; // Returns the created game
  } catch (error) {
    throw new Error(`Error creating the game: ${error.message}`);
  }
};

// Get all games
const getAllGames = async () => {
  const query = "SELECT * FROM games;";
  try {
    const res = await pool.query(query);
    return res.rows; // Returns all games
  } catch (error) {
    throw new Error(`Error fetching games: ${error.message}`);
  }
};

// Get a game by ID
const getGameById = async (id) => {
  const query = "SELECT * FROM games WHERE id = $1;";
  try {
    const res = await pool.query(query, [id]);
    if (res.rows.length === 0) {
      throw new Error("Game not found");
    }
    return res.rows[0]; // Returns the game
  } catch (error) {
    throw new Error(`Error fetching the game: ${error.message}`);
  }
};

// Get top N scores with user info
const getTopScores = async (limit = 10) => {
  const query = `
    SELECT
      users.id AS user_id,
      users.name,
      MAX(games.score) AS top_score
    FROM games
    JOIN users ON games.user_id = users.id
    GROUP BY users.id, users.name
    ORDER BY top_score DESC
    LIMIT $1;
  `;

  try {
    const res = await pool.query(query, [limit]);
    return res.rows;
  } catch (error) {
    throw new Error(`Error fetching top scores: ${error.message}`);
  }
};

// Update a game
const updateGame = async (id, gameData) => {
  const { user_id, score } = gameData;
  const query = `
    UPDATE games
    SET user_id = $1, score = $2
    WHERE id = $3
    RETURNING *;
  `;
  try {
    const res = await pool.query(query, [user_id, score, id]);
    return res.rows[0]; // Returns the updated game
  } catch (error) {
    throw new Error(`Error updating the game: ${error.message}`);
  }
};

// Delete a game
const deleteGame = async (id) => {
  const query = "DELETE FROM games WHERE id = $1 RETURNING *;";
  try {
    const res = await pool.query(query, [id]);
    if (res.rows.length === 0) {
      throw new Error("Game not found");
    }
    return res.rows[0]; // Returns the deleted game
  } catch (error) {
    throw new Error(`Error deleting the game: ${error.message}`);
  }
};

export {
  createGame,
  getAllGames,
  getGameById,
  getTopScores,
  updateGame,
  deleteGame,
};
