FROM node:current-slim

WORKDIR /usr/src/Cypress-Dependencies
RUN apt-get update -y && apt-get install libgtk2.0-0 libgtk-3-0 libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb -y

COPY package.json .
COPY package-lock.json .
RUN npm ci

COPY . .

ENTRYPOINT [ "npm", "test" ]
