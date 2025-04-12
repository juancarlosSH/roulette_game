# Use official Node.js image with Alpine for smaller size
FROM node:18-alpine

# Install PostgreSQL client and required dependencies
RUN apk add --no-cache postgresql-client bash

# Create and set working directory
WORKDIR /app

# 1. Copy package files first for better layer caching
COPY package*.json ./

# Install production dependencies only (remove devDependencies)
RUN npm install --production && \
  npm cache clean --force

# 2. Copy the rest of the files
COPY . .

# Set up directories structure
RUN mkdir -p /db && \
  mv /app/db/init.sql /db/init.sql && \
  chmod +x /app/entrypoint.sh

# Environment variables (documentation purposes)
ENV NODE_ENV=production \
  DB_HOST=postgres \
  DB_PORT=5432 \
  DB_USER=postgres \
  DB_NAME=roulette_game \
  APP_PORT=3000

# Expose the application port
EXPOSE $APP_PORT

# Health check (optional but recommended)
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:$APP_PORT/health || exit 1

# Use entrypoint with exec form for proper signal handling
ENTRYPOINT ["./entrypoint.sh"]

# Default command to run the application
CMD ["npm", "start"]
