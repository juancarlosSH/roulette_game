import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Function to create a new user (now with password hashing requirement)
const createUser = async (userData) => {
  const { username, email, password_hash } = userData;

  const query = `
    INSERT INTO users (username, email, password_hash)
    VALUES ($1, $2, $3)
    RETURNING id, username, email, created_at;
  `;

  try {
    const res = await pool.query(query, [username, email, password_hash]);
    return res.rows[0];
  } catch (error) {
    // Handle duplicate email error specifically
    if (error.code === "23505") {
      throw new Error("Email already exists");
    }
    throw new Error(`Error creating user: ${error.message}`);
  }
};

// Function to get all users (excludes sensitive data)
const getAllUsers = async () => {
  const query = `
    SELECT id, username, email, created_at
    FROM users;
  `;
  try {
    const res = await pool.query(query);
    return res.rows;
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};

// Function to get a user by ID (for authentication)
const getUserById = async (id) => {
  const query = `
    SELECT id, username, email, password_hash, created_at
    FROM users
    WHERE id = $1;
  `;
  try {
    const res = await pool.query(query, [id]);
    if (res.rows.length === 0) {
      throw new Error("User not found");
    }
    return res.rows[0];
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
};

// Function to get user by email (for login)
const getUserByEmail = async (email) => {
  const query = `
    SELECT id, username, email, password_hash
    FROM users
    WHERE email = $1;
  `;
  try {
    const res = await pool.query(query, [email]);
    if (res.rows.length === 0) {
      throw new Error("User not found");
    }
    return res.rows[0];
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
};

// Function to update user profile
const updateUser = async (id, userData) => {
  const { username, email } = userData;

  const query = `
    UPDATE users
    SET username = $1, email = $2, updated_at = NOW()
    WHERE id = $3
    RETURNING id, username, email, created_at;
  `;

  try {
    const res = await pool.query(query, [username, email, id]);
    if (res.rows.length === 0) {
      throw new Error("User not found");
    }
    return res.rows[0];
  } catch (error) {
    if (error.code === "23505") {
      throw new Error("Email already exists");
    }
    throw new Error(`Error updating user: ${error.message}`);
  }
};

// Function to update password (separate method for security)
const updatePassword = async (id, password_hash) => {
  const query = `
    UPDATE users
    SET password_hash = $1
    WHERE id = $2
    RETURNING id;
  `;
  try {
    const res = await pool.query(query, [password_hash, id]);
    if (res.rows.length === 0) {
      throw new Error("User not found");
    }
    return res.rows[0];
  } catch (error) {
    throw new Error(`Error updating password: ${error.message}`);
  }
};

// Function to delete a user
const deleteUser = async (id) => {
  const query = `
    DELETE FROM users
    WHERE id = $1
    RETURNING id, username, email;
  `;
  try {
    const res = await pool.query(query, [id]);
    if (res.rows.length === 0) {
      throw new Error("User not found");
    }
    return res.rows[0];
  } catch (error) {
    throw new Error(`Error deleting user: ${error.message}`);
  }
};

export {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  updatePassword,
  deleteUser,
};
