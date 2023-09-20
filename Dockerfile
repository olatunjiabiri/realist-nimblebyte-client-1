# syntax=docker/dockerfile:1

FROM node:19-alpine as build
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm i --production
# RUN npm ci --omit=dev

COPY . .

EXPOSE 80
CMD ["npm", "start"]