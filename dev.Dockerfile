FROM node:16.13-alpine

WORKDIR /usr/app

COPY package*.json ./
COPY tsconfig.json ./
COPY .eslintrc.js ./
COPY ./src src/

RUN npm ci
RUN npm run build

ENV NODE_ENV "dev"

CMD ["npm", "run", "dev"]
