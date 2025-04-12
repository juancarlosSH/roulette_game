#!/bin/bash

# Exit immediately if a command fails
set -e

# Wait for PostgreSQL to be ready (with timeout)
echo "Waiting for PostgreSQL to start..."
timeout=30
while ! PGPASSWORD=$DB_PASSWORD psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -c '\q' 2>/dev/null; do
  if [ $timeout -eq 0 ]; then
    echo "Error: PostgreSQL not ready within 30 seconds, exiting."
    exit 1
  fi
  echo "PostgreSQL is not ready yet, waiting..."
  sleep 2
  timeout=$((timeout - 2))
done

# Check if we need to initialize the database
echo "Checking database initialization status..."
TABLES_EXIST=$(PGPASSWORD=$DB_PASSWORD psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -t -c "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public');" | xargs)

if [ "$TABLES_EXIST" = "f" ]; then
  echo "Initializing database schema..."
  PGPASSWORD=$DB_PASSWORD psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -f /db/init.sql
fi

# Check if we need to generate sample data
echo "Checking if sample data is needed..."
GAME_SESSIONS_COUNT=$(PGPASSWORD=$DB_PASSWORD psql -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -t -c "SELECT COUNT(*) FROM game_sessions;" | xargs)

if [[ "$GAME_SESSIONS_COUNT" =~ ^[0-9]+$ ]] && [ "$GAME_SESSIONS_COUNT" -eq 0 ]; then
  echo "No game sessions found, generating sample data..."
  node /backend/generateFakeData.js
else
  echo "Database already contains game data. Skipping data generation."
fi

# Start the application
echo "Starting the application..."
exec "$@"
