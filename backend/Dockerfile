FROM node:18-alpine as builder

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN yarn global add @nestjs/cli@9

COPY package*.json ./
COPY prisma ./prisma/

RUN yarn

COPY . .

RUN yarn build
RUN rm -rf node_modules
RUN yarn install --production

FROM node:18-alpine

RUN apk update && apk add --upgrade apk-tools && apk upgrade --available
RUN apk --no-cache add curl

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY --chown=node:node --from=builder /usr/src/app/dist ./dist
COPY --chown=node:node --from=builder /usr/src/app/package*.json ./
COPY --chown=node:node --from=builder /usr/src/app/prisma ./prisma
COPY --chown=node:node --from=builder /usr/src/app/node_modules ./node_modules

ENV LISTEN_PORT=3001
EXPOSE $LISTEN_PORT

ENV NODE_ENV=production

CMD [  "yarn", "start:migrate:dev" ]