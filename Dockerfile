FROM node:latest
WORKDIR /labook-api
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build
RUN npm run migrations:users create
RUN migrations:posts create
ENTRYPOINT npm start