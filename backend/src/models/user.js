import pg from "pg";

// Configuración de la base de datos
const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Función para crear un nuevo usuario
const createUser = async (userData) => {
  const {
    name,
    birth_date,
    email,
    password,
    is_admin = false,
    high_score = 0,
  } = userData;

  const query = `
    INSERT INTO users (name, birth_date, email, password, is_admin, high_score)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  try {
    const res = await pool.query(query, [
      name,
      birth_date,
      email,
      password,
      is_admin,
      high_score,
    ]);
    return res.rows[0]; // Devuelve el usuario recién creado
  } catch (error) {
    throw new Error(`Error al crear el usuario: ${error.message}`);
  }
};

// Función para obtener todos los usuarios
const getAllUsers = async () => {
  const query = "SELECT * FROM users;";

  try {
    const res = await pool.query(query);
    return res.rows; // Devuelve todos los usuarios
  } catch (error) {
    throw new Error(`Error al obtener los usuarios: ${error.message}`);
  }
};

// Función para obtener un usuario por ID
const getUserById = async (id) => {
  const query = "SELECT * FROM users WHERE id = $1;";

  try {
    const res = await pool.query(query, [id]);
    if (res.rows.length === 0) {
      throw new Error("Usuario no encontrado");
    }
    return res.rows[0]; // Devuelve el usuario encontrado
  } catch (error) {
    throw new Error(`Error al obtener el usuario: ${error.message}`);
  }
};

// Función para actualizar un usuario
const updateUser = async (id, userData) => {
  const { name, birth_date, email, password, is_admin, high_score } = userData;

  const query = `
    UPDATE users
    SET name = $1, birth_date = $2, email = $3, password = $4, is_admin = $5, high_score = $6
    WHERE id = $7
    RETURNING *;
  `;

  try {
    const res = await pool.query(query, [
      name,
      birth_date,
      email,
      password,
      is_admin,
      high_score,
      id,
    ]);
    return res.rows[0]; // Devuelve el usuario actualizado
  } catch (error) {
    throw new Error(`Error al actualizar el usuario: ${error.message}`);
  }
};

// Función para eliminar un usuario
const deleteUser = async (id) => {
  const query = "DELETE FROM users WHERE id = $1 RETURNING *;";

  try {
    const res = await pool.query(query, [id]);
    if (res.rows.length === 0) {
      throw new Error("Usuario no encontrado");
    }
    return res.rows[0]; // Devuelve el usuario eliminado
  } catch (error) {
    throw new Error(`Error al eliminar el usuario: ${error.message}`);
  }
};

export { createUser, getAllUsers, getUserById, updateUser, deleteUser };
