FROM node:18-alpine as react

WORKDIR /usr/src/web

RUN apk update && apk add bash

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5173