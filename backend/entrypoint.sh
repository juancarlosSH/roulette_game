#!/bin/bash

# Salir inmediatamente si un comando falla
set -e

# Esperar a que la base de datos esté lista
echo "Waiting for PostgreSQL to start..."
until PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -U $DB_USER -d $DB_NAME -c '\q' 2>/dev/null; do
  echo "PostgreSQL is not ready yet, waiting..."
  sleep 2
done

# Verificar si ya hay datos en la tabla users
echo "Checking if the users table has data..."
USER_COUNT=$(PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -U $DB_USER -d $DB_NAME -t -c "SELECT COUNT(*) FROM users;" | xargs)

if [[ "$USER_COUNT" =~ ^[0-9]+$ ]] && [ "$USER_COUNT" -gt 0 ]; then
  echo "Data already exists in the users table. Skipping data generation."
else
  echo "No data found, generating fake data..."
  node generateFakeData.js
fi

# Iniciar la aplicación
echo "Starting the application..."
exec "$@"
