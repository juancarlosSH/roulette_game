import { faker } from "@faker-js/faker";
import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Generate fake users (without is_admin and high_score)
const generateFakeUsers = async (numUsers = 10) => {
  const users = [];
  for (let i = 0; i < numUsers; i++) {
    const name = faker.person.fullName();
    const birthDate = faker.date.past({ years: 30, refDate: "2000-01-01" });
    const email = faker.internet.email();
    const password = faker.internet.password();

    users.push({
      name,
      birthDate,
      email,
      password,
    });
  }

  for (const user of users) {
    await pool.query(
      "INSERT INTO users (name, birth_date, email, password) VALUES ($1, $2, $3, $4)",
      [user.name, user.birthDate, user.email, user.password]
    );
  }

  console.log(`${users.length} fake users have been created.`);
};

// Generate fake games
const generateFakeGames = async (numGames = 10) => {
  const users = await pool.query("SELECT id FROM users");
  const userIds = users.rows.map((user) => user.id);

  const games = [];
  for (let i = 0; i < numGames; i++) {
    const userId = userIds[Math.floor(Math.random() * userIds.length)];
    const score = faker.number.int({ min: 0, max: 1000 });

    games.push({ userId, score });
  }

  for (const game of games) {
    await pool.query("INSERT INTO games (user_id, score) VALUES ($1, $2)", [
      game.userId,
      game.score,
    ]);
  }

  console.log(`${games.length} fake games have been created.`);
};

const main = async () => {
  try {
    await generateFakeUsers();
    await generateFakeGames();
  } catch (error) {
    console.error("Error generating fake data:", error);
  } finally {
    await pool.end();
  }
};

main();
