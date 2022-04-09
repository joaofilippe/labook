FROM node:latest
WORKDIR /labook-api
COPY package*.json .
RUN npm install
COPY . .
ENTRYPOINT npm start