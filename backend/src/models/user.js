import pg from "pg";

// Database configuration
const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Function to create a new user
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
    return res.rows[0]; // Returns the newly created user
  } catch (error) {
    throw new Error(`Error creating the user: ${error.message}`);
  }
};

// Function to get all users
const getAllUsers = async () => {
  const query = "SELECT * FROM users;";

  try {
    const res = await pool.query(query);
    return res.rows; // Returns all users
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};

// Function to get a user by ID
const getUserById = async (id) => {
  const query = "SELECT * FROM users WHERE id = $1;";

  try {
    const res = await pool.query(query, [id]);
    if (res.rows.length === 0) {
      throw new Error("User not found");
    }
    return res.rows[0]; // Returns the found user
  } catch (error) {
    throw new Error(`Error fetching the user: ${error.message}`);
  }
};

// Function to update a user
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
    return res.rows[0]; // Returns the updated user
  } catch (error) {
    throw new Error(`Error updating the user: ${error.message}`);
  }
};

// Function to delete a user
const deleteUser = async (id) => {
  const query = "DELETE FROM users WHERE id = $1 RETURNING *;";

  try {
    const res = await pool.query(query, [id]);
    if (res.rows.length === 0) {
      throw new Error("User not found");
    }
    return res.rows[0]; // Returns the deleted user
  } catch (error) {
    throw new Error(`Error deleting the user: ${error.message}`);
  }
};

export { createUser, getAllUsers, getUserById, updateUser, deleteUser };
