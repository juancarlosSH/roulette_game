import { faker } from "@faker-js/faker"; // Importación de faker
import pkg from "pg";

const { Pool } = pkg; // Correcta importación de Pool desde pg

// Configuración de la base de datos usando variables de entorno
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const generateFakeUsers = async (numUsers = 10) => {
  const users = [];
  for (let i = 0; i < numUsers; i++) {
    const name = faker.person.fullName(); // Usando la nueva función 'person.fullName()'
    const birthDate = faker.date.past(30, "2000-01-01");
    const email = faker.internet.email();
    const password = faker.internet.password();
    const isAdmin = Math.random() > 0.8; // Aproximadamente un 20% de los usuarios serán administradores
    const highScore = faker.number.int({ min: 0, max: 1000 }); // Usando 'number.int()' para generar un número

    users.push({
      name,
      birthDate,
      email,
      password,
      isAdmin,
      highScore,
    });
  }

  // Insertar usuarios en la base de datos
  for (const user of users) {
    await pool.query(
      "INSERT INTO users (name, birth_date, email, password, is_admin, high_score) VALUES ($1, $2, $3, $4, $5, $6)",
      [
        user.name,
        user.birthDate,
        user.email,
        user.password,
        user.isAdmin,
        user.highScore,
      ]
    );
  }

  console.log(`${users.length} fake users have been created.`);
};

const generateFakeGames = async (numGames = 10) => {
  const users = await pool.query("SELECT id FROM users");
  const userIds = users.rows.map((user) => user.id);

  const games = [];
  for (let i = 0; i < numGames; i++) {
    const userId = userIds[Math.floor(Math.random() * userIds.length)];
    const score = faker.number.int({ min: 0, max: 1000 }); // Usando 'number.int()' para generar un número

    games.push({
      userId,
      score,
    });
  }

  // Insertar juegos en la base de datos
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
    pool.end();
  } catch (error) {
    console.error("Error generating fake data:", error);
    pool.end();
  }
};

main();
