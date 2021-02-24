FROM node:14

WORKDIR /usr/urlshortnerapi

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 8081

CMD ["npm", "start"]