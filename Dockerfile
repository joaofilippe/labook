FROM node:latest
WORKDIR /labook-api
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build
ENTRYPOINT npm start