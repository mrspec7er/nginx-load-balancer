FROM node:18-alpine as react

COPY . /usr/src/web

WORKDIR /usr/src/web

RUN npm install

RUN apk update && apk add bash

EXPOSE 5173