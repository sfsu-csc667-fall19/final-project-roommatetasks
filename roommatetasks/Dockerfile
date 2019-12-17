FROM node:10-alpine

WORKDIR /main

COPY . /main

RUN npm install

COPY . .

EXPOSE 80

CMD ["npm", "start"]