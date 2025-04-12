#!/bin/bash
set -e

# Configuración de la base de datos
DB_CONN="-h $DB_HOST -U $DB_USER -d $DB_NAME"
export PGPASSWORD=$DB_PASSWORD

# Esperar a que PostgreSQL esté listo (con timeout)
echo "⌛ Waiting for PostgreSQL at $DB_HOST..."
timeout=30
while ! psql $DB_CONN -c '\q' 2>/dev/null; do
  if [ $timeout -eq 0 ]; then
    echo "⛔ PostgreSQL not ready after 30 seconds, exiting"
    exit 1
  fi
  echo "🔄 PostgreSQL not ready yet, waiting..."
  sleep 2
  timeout=$((timeout - 2))
done

# Verificar si la tabla users existe
echo "🔍 Checking database state..."
if ! psql $DB_CONN -t -c "SELECT 1 FROM information_schema.tables WHERE table_name = 'users'" | grep -q 1; then
  # Inicializar base de datos
  echo "🛠️ Initializing database schema..."
  psql $DB_CONN -f /db/init.sql

  # Solo generar datos si es entorno de desarrollo
  if [ "$NODE_ENV" = "development" ]; then
    echo "🎲 Generating sample data..."
    node /app/generateFakeData.js
  fi
else
  echo "✅ Database already initialized"
fi

# Iniciar la aplicación
echo "🚀 Starting application..."
exec "$@"
