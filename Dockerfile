# Fase 1: Construcción de la aplicación
FROM node:20.17.0-alpine AS builder
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build


FROM node:20.17.0-alpine
WORKDIR /app
RUN npm i -g serve
COPY --from=builder /app/dist /app/dist
CMD [ "serve", "-s", "dist" ]
