ARG NODE_VERSION=20.18.1

FROM node:${NODE_VERSION}-bookworm-slim

# Puppeteer 22 requires Node.js 18 or newer. Use Debian's Chromium package
# rather than a deprecated external Chrome repository.
ENV PUPPETEER_SKIP_DOWNLOAD=true \
    CHROME_BIN=/usr/bin/chromium

RUN apt-get update \
    && apt-get install -y --no-install-recommends chromium \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy the lockfile first so the dependency layer remains cacheable. `npm ci`
# makes container installs deterministic and fails if it drifts from the lock.
COPY package.json package-lock.json ./
RUN npm ci

COPY . ./

EXPOSE 4200

CMD ["npm", "start"]
