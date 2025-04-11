FROM node:18-slim

# Install PostgreSQL client to interact with the PostgreSQL database
RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy only the necessary files to install dependencies to take advantage of Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Then copy the rest of the project (to avoid invalidating the previous cache)
COPY . .

# Ensure that the entrypoint.sh script is executable
RUN chmod +x /app/entrypoint.sh

EXPOSE 3000

# Use entrypoint.sh to check if the data is generated and then start the application
ENTRYPOINT ["./entrypoint.sh"]

# The CMD is to start the application after running the entrypoint script
CMD ["npm", "start"]
