# syntax=docker/dockerfile:1

FROM node:18-alpine
# ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm i --production
# RUN npm ci --omit=dev
RUN npm build

COPY . .

EXPOSE 3000
CMD ["npm", "start"]