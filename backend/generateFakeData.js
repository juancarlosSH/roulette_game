import { faker } from "@faker-js/faker";
import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Generar usuarios falsos
const generateFakeUsers = async (numUsers = 10) => {
  const users = [];
  for (let i = 0; i < numUsers; i++) {
    users.push({
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password_hash: faker.internet.password(), // En producción usaría bcrypt
    });
  }

  for (const user of users) {
    try {
      await pool.query(
        "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3)",
        [user.username, user.email, user.password_hash]
      );
    } catch (error) {
      console.warn(`Duplicate email skipped: ${user.email}`);
    }
  }

  console.log(
    `${users.length} fake users created (duplicates may have been skipped).`
  );
};

// Generar partidas falsas con rondas
const generateFakeGameSessions = async (numSessions = 20) => {
  const users = await pool.query("SELECT id FROM users");
  const userIds = users.rows.map((user) => user.id);

  if (userIds.length === 0) {
    console.log("No users found. Create users first.");
    return;
  }

  for (let i = 0; i < numSessions; i++) {
    const userId = userIds[Math.floor(Math.random() * userIds.length)];
    const roundsPlayed = faker.number.int({ min: 1, max: 10 });
    let finalScore = 0;

    // Crear la sesión de juego
    const sessionRes = await pool.query(
      "INSERT INTO game_sessions (user_id, final_score, rounds_played) VALUES ($1, $2, $3) RETURNING id",
      [userId, 0, roundsPlayed]
    );
    const sessionId = sessionRes.rows[0].id;

    // Generar rondas para esta sesión
    for (let round = 0; round < roundsPlayed; round++) {
      const userNumber = faker.number.int({ min: 1, max: 10 });
      const machineNumber = faker.number.int({ min: 1, max: 10 });
      const roundScore = userNumber - machineNumber;
      finalScore += roundScore;

      await pool.query(
        "INSERT INTO game_rounds (session_id, user_number, machine_number, round_score) VALUES ($1, $2, $3, $4)",
        [sessionId, userNumber, machineNumber, roundScore]
      );
    }

    // Actualizar el puntaje final de la sesión
    await pool.query(
      "UPDATE game_sessions SET final_score = $1 WHERE id = $2",
      [finalScore, sessionId]
    );
  }

  console.log(`${numSessions} fake game sessions with rounds created.`);
};

// Función principal
const main = async () => {
  try {
    await generateFakeUsers();
    await generateFakeGameSessions();
  } catch (error) {
    console.error("Error generating fake data:", error);
  } finally {
    await pool.end();
  }
};

main();
