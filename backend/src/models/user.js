import pg from "pg";

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
  const { name, birth_date, email, password } = userData;

  const query = `
    INSERT INTO users (name, birth_date, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  try {
    const res = await pool.query(query, [name, birth_date, email, password]);
    return res.rows[0];
  } catch (error) {
    throw new Error(`Error creating the user: ${error.message}`);
  }
};

// Function to get all users
const getAllUsers = async () => {
  const query = "SELECT * FROM users;";
  try {
    const res = await pool.query(query);
    return res.rows;
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
    return res.rows[0];
  } catch (error) {
    throw new Error(`Error fetching the user: ${error.message}`);
  }
};

// Function to update a user
const updateUser = async (id, userData) => {
  const { name, birth_date, email, password } = userData;

  const query = `
    UPDATE users
    SET name = $1, birth_date = $2, email = $3, password = $4
    WHERE id = $5
    RETURNING *;
  `;

  try {
    const res = await pool.query(query, [
      name,
      birth_date,
      email,
      password,
      id,
    ]);
    return res.rows[0];
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
    return res.rows[0];
  } catch (error) {
    throw new Error(`Error deleting the user: ${error.message}`);
  }
};

export { createUser, getAllUsers, getUserById, updateUser, deleteUser };
