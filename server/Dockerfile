FROM node:20

WORKDIR /server

COPY package*.json ./

RUN npm install

RUN npm run build

COPY dist .

EXPOSE 3000

CMD ["npm", "run", "start:prod"]