FROM node:20-alpine

WORKDIR /app

# Copy the entire monorepo
COPY . .

# Install dependencies
RUN npm install

# Build the Web app
RUN npx turbo run build --filter=web

# Run the Web app
ENV PORT=3002
CMD ["npm", "run", "start", "-w", "apps/web"]
