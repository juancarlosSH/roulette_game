import { pool } from "./db.js";

const createGameSession = async (userId) => {
  const query = `
    INSERT INTO game_sessions (user_id, final_score, rounds_played)
    VALUES ($1, 0, 0)
    RETURNING *;
  `;

  try {
    const res = await pool.query(query, [userId]);
    return res.rows[0];
  } catch (error) {
    throw new Error(`Error creating game session: ${error.message}`);
  }
};

const updateGameSession = async (sessionId, finalScore, roundsPlayed) => {
  const query = `
    UPDATE game_sessions
    SET final_score = $1, rounds_played = $2
    WHERE id = $3
    RETURNING *;
  `;

  try {
    const res = await pool.query(query, [finalScore, roundsPlayed, sessionId]);
    if (res.rows.length === 0) {
      throw new Error("Game session not found");
    }
    return res.rows[0];
  } catch (error) {
    throw new Error(`Error updating game session: ${error.message}`);
  }
};

const getSessionsByUser = async (userId) => {
  const query = `
    SELECT id, final_score, rounds_played, created_at
    FROM game_sessions
    WHERE user_id = $1
    ORDER BY created_at DESC;
  `;

  try {
    const res = await pool.query(query, [userId]);
    return res.rows;
  } catch (error) {
    throw new Error(`Error fetching user sessions: ${error.message}`);
  }
};

const getSessionById = async (sessionId) => {
  const query = `
    SELECT
      gs.id,
      gs.final_score,
      gs.rounds_played,
      gs.created_at,
      u.username
    FROM game_sessions gs
    JOIN users u ON gs.user_id = u.id
    WHERE gs.id = $1;
  `;

  try {
    const res = await pool.query(query, [sessionId]);
    if (res.rows.length === 0) {
      throw new Error("Game session not found");
    }
    return res.rows[0];
  } catch (error) {
    throw new Error(`Error fetching session: ${error.message}`);
  }
};

export {
  createGameSession,
  updateGameSession,
  getSessionsByUser,
  getSessionById,
};
