FROM node:20.17.0-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build



FROM node:20.17.0-alpine

WORKDIR /app

RUN npm i -g serve && \
    mkdir dist

COPY /dist /app/dist

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]
