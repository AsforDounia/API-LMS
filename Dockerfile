# Image Node officielle
FROM node:20-alpine

# Dossier de travail
WORKDIR /app

# Copier package.json
COPY package*.json ./

# Installer dépendances
RUN npm install

# Copier le reste du projet
COPY . .

# Build NestJS
RUN npm run build

# Exposer le port
EXPOSE 3000

# Lancer l’API
CMD ["npm", "run", "start:prod"]
