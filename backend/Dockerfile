FROM postgres:alpine as postgres

WORKDIR /usr/db

FROM node:18-alpine as fastify

RUN apk update && apk add bash

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000
