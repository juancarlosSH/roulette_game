FROM node:18

WORKDIR /app

# Copy only the necessary files to install dependencies
COPY package*.json ./

# Install dependencies here
RUN npm install

# Then copy the rest of the project (to avoid invalidating the previous cache)
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
