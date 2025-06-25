FROM node:16-alpine

WORKDIR /app
ADD . .

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

RUN npm install

CMD npm run start
