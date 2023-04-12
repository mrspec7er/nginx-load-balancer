FROM node:18-alpine as react

WORKDIR /usr/src/web

COPY package.json .

RUN npm install

COPY . .

RUN apk update && apk add bash

EXPOSE 5173