import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Registrar una nueva ronda
const createGameRound = async (sessionId, userNumber, machineNumber) => {
  const roundScore = userNumber - machineNumber;

  const query = `
    INSERT INTO game_rounds (
      session_id,
      user_number,
      machine_number,
      round_score
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  try {
    const res = await pool.query(query, [
      sessionId,
      userNumber,
      machineNumber,
      roundScore,
    ]);
    return res.rows[0];
  } catch (error) {
    throw new Error(`Error creating game round: ${error.message}`);
  }
};

// Obtener todas las rondas de una partida
const getRoundsBySession = async (sessionId) => {
  const query = `
    SELECT
      id,
      user_number,
      machine_number,
      round_score,
      created_at
    FROM game_rounds
    WHERE session_id = $1
    ORDER BY created_at ASC;
  `;

  try {
    const res = await pool.query(query, [sessionId]);
    return res.rows;
  } catch (error) {
    throw new Error(`Error fetching rounds: ${error.message}`);
  }
};

// Obtener estadísticas de rondas por usuario
const getUserRoundStats = async (userId) => {
  const query = `
    SELECT
      COUNT(*) as total_rounds,
      AVG(round_score) as avg_score,
      MAX(round_score) as max_score
    FROM game_rounds gr
    JOIN game_sessions gs ON gr.session_id = gs.id
    WHERE gs.user_id = $1;
  `;

  try {
    const res = await pool.query(query, [userId]);
    return res.rows[0];
  } catch (error) {
    throw new Error(`Error fetching round stats: ${error.message}`);
  }
};

export { createGameRound, getRoundsBySession, getUserRoundStats };
