FROM node:18-alpine3.17

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY .env ./

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
