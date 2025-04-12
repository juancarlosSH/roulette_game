FROM node:18-alpine

# Instalar dependencias
RUN apk add --no-cache postgresql-client bash

# Configurar directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
RUN npm install --omit=dev && npm cache clean --force

# Copiar el resto de la aplicación
COPY . .

# Dar permisos al entrypoint
RUN chmod +x entrypoint.sh

# Variables de entorno
ENV NODE_ENV=production
EXPOSE 3000

ENTRYPOINT ["./entrypoint.sh"]
CMD ["npm", "start"]
