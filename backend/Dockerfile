FROM node:18

# We install psql to interact with the PostgreSQL database
RUN apt-get update && apt-get install -y postgresql-client

WORKDIR /app

# Copy only the necessary files to install dependencies
COPY package*.json ./

# Install dependencies here
RUN npm install

# Then copy the rest of the project (to avoid invalidating the previous cache)
COPY . .

# Ensure that the entrypoint.sh script is executable
RUN chmod +x /app/entrypoint.sh

EXPOSE 3000

# We use entrypoint.sh to check if the data is generated and then start the application
ENTRYPOINT ["./entrypoint.sh"]

# The CMD is to start the application after running the entrypoint script
CMD ["npm", "start"]
