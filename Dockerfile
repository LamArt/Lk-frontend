FROM node:18.17.1

#Нужно сделать для каждого приложения, который бы запускал там preview. RUN npm run preview работает вечно.
# Сейчас это запускает скрипт package.json из корня репозитория

WORKDIR /app

#убрать чтобы работало
COPY package.json ./

RUN mkdir "Host"

WORKDIR /Host

COPY Host/package.json ./

RUN npm install

COPY Host/ .

EXPOSE 3000

RUN npm run build

#убрать чтобы работало
WORKDIR ../

#убрать чтобы работало
RUN mkdir "Authorization"

#убрать чтобы работало
WORKDIR /Authorization

#убрать чтобы работало
COPY Authorization/package.json ./

#убрать чтобы работало
RUN npm install

#убрать чтобы работало
COPY Authorization/ .

#убрать чтобы работало
EXPOSE 3001

#убрать чтобы работало
RUN npm run build

#убрать чтобы работало
WORKDIR ../app/

CMD [ "npm", "run", "preview" ]