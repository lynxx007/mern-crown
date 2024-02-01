FROM node:21-alpine3.18

ENV NODE_ENV="production"

WORKDIR /app

COPY package*.json ./

RUN npm install --production=false

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm","run","start"]