FROM node:16-alpine as installer

WORKDIR /usr/app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

FROM node:16-alpine as builder

WORKDIR /usr/app

COPY --from=installer /usr/app .
RUN npx prisma generate
RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "start:prod"]