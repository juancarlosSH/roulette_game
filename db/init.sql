CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS game_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    final_score INTEGER NOT NULL,
    rounds_played INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS game_rounds (
    id SERIAL PRIMARY KEY,
    session_id INTEGER NOT NULL REFERENCES game_sessions(id) ON DELETE CASCADE,
    user_number SMALLINT NOT NULL CHECK (user_number BETWEEN 1 AND 10),
    machine_number SMALLINT NOT NULL CHECK (machine_number BETWEEN 1 AND 10),
    round_score INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_sessions ON game_sessions(user_id);
CREATE INDEX idx_session_rounds ON game_rounds(session_id);
CREATE INDEX idx_user_email ON users(email);
