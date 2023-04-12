FROM postgres:alpine as postgres
WORKDIR /usr/db

FROM node:18-alpine as fastify

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

RUN apk update && apk add bash

EXPOSE 3000