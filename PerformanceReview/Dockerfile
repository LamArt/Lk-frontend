FROM node:18.17.1

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3002

RUN npm run build

CMD npm run serve -- --port 3002 --host 0.0.0.0