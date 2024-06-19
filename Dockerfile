ARG NODE_VERSION=16.15.1-alpine3.15

FROM node:${NODE_VERSION}

# Installs latest Chromium package.
RUN apk upgrade --no-cache --available \
    && apk add --no-cache \
      chromium-swiftshader \
      ttf-freefont \
      font-noto-emoji \
    && apk add --no-cache \
      --repository=https://dl-cdn.alpinelinux.org/alpine/edge/community \
      font-wqy-zenhei

# Set the CHROME_BIN environment variable to the Chromium binary
ENV CHROME_BIN=/usr/bin/chromium-browser

# Verify the CHROME_BIN environment variable
RUN echo "CHROME_BIN is set to: ${CHROME_BIN}"

RUN mkdir -p /src/app 

WORKDIR /app

ADD package*.json /app

COPY mdb-angular-ui-kit-4.1.0.tgz /app

RUN npm install

COPY . .