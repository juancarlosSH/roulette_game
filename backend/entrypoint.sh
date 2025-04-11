#!/bin/bash

# Exit immediately if a command fails
set -e

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to start..."
until PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -U $DB_USER -d $DB_NAME -c '\q' 2>/dev/null; do
  echo "PostgreSQL is not ready yet, waiting..."
  sleep 2
done

# Check if there is data in the users table
echo "Checking if the users table has data..."
USER_COUNT=$(PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -U $DB_USER -d $DB_NAME -t -c "SELECT COUNT(*) FROM users;" | xargs)

if [[ "$USER_COUNT" =~ ^[0-9]+$ ]] && [ "$USER_COUNT" -gt 0 ]; then
  echo "Data already exists in the users table. Skipping data generation."
else
  echo "No data found, generating fake data..."
  node generateFakeData.js
fi

# Start the application
echo "Starting the application..."
exec "$@"
