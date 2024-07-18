ARG NODE_VERSION=16.15.1

FROM node:${NODE_VERSION}

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -

RUN echo "deb http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google.list
    
RUN apt-get update && apt-get install -y google-chrome-stable xvfb

WORKDIR /app

COPY package*.json /app

COPY mdb-angular-ui-kit-4.1.0.tgz /app

RUN npm install

COPY . .