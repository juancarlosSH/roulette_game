import pg from "pg";

const { Pool } = pg;
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Crear una nueva partida
const createGame = async (gameData) => {
  const { user_id, score } = gameData;
  const query = `
    INSERT INTO games (user_id, score)
    VALUES ($1, $2)
    RETURNING *;
  `;
  try {
    const res = await pool.query(query, [user_id, score]);
    return res.rows[0]; // Devuelve la partida creada
  } catch (error) {
    throw new Error(`Error al crear la partida: ${error.message}`);
  }
};

// Obtener todas las partidas
const getAllGames = async () => {
  const query = "SELECT * FROM games;";
  try {
    const res = await pool.query(query);
    return res.rows; // Devuelve todas las partidas
  } catch (error) {
    throw new Error(`Error al obtener las partidas: ${error.message}`);
  }
};

// Obtener una partida por ID
const getGameById = async (id) => {
  const query = "SELECT * FROM games WHERE id = $1;";
  try {
    const res = await pool.query(query, [id]);
    if (res.rows.length === 0) {
      throw new Error("Partida no encontrada");
    }
    return res.rows[0]; // Devuelve la partida
  } catch (error) {
    throw new Error(`Error al obtener la partida: ${error.message}`);
  }
};

// Actualizar una partida
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
    return res.rows[0]; // Devuelve la partida actualizada
  } catch (error) {
    throw new Error(`Error al actualizar la partida: ${error.message}`);
  }
};

// Eliminar una partida
const deleteGame = async (id) => {
  const query = "DELETE FROM games WHERE id = $1 RETURNING *;";
  try {
    const res = await pool.query(query, [id]);
    if (res.rows.length === 0) {
      throw new Error("Partida no encontrada");
    }
    return res.rows[0]; // Devuelve la partida eliminada
  } catch (error) {
    throw new Error(`Error al eliminar la partida: ${error.message}`);
  }
};

export { createGame, getAllGames, getGameById, updateGame, deleteGame };
