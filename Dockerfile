FROM node:alpine AS base
WORKDIR /usr/src/app
COPY package.json package-lock.json ./

FROM base AS dev_deps
RUN npm ci --only=development

FROM base AS build
COPY --from=dev_deps /usr/src/app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS release
COPY --from=build /usr/src/app/dist ./dist
EXPOSE ${PORT}
CMD ["npm", "run", "start:prod"]