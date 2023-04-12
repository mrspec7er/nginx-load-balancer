FROM postgres:alpine as postgres
WORKDIR /usr/db

FROM node:18-alpine as fastify

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN npm install

RUN apk update && apk add bash

EXPOSE 3000