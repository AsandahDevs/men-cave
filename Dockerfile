ARG NODE_VERSION=16.15.1-alpine3.15

FROM node:${NODE_VERSION}

RUN mkdir -p /src/app 

WORKDIR /app

ADD package*.json /app/

COPY . .

RUN npm install