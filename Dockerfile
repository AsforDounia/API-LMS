# Image Node officielle
FROM node:20-alpine

WORKDIR /app

# Copier package.json + package-lock.json
COPY package*.json ./

# Installer dépendances
RUN npm install

# Copier le reste du projet
COPY . .

# Build NestJS
RUN npm run build

EXPOSE 3000

# Lancer en dev pour recharger automatiquement
CMD ["npm", "run", "start:dev"]
