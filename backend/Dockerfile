# Étape 1 : Build de l'application
FROM node:slim as builder

WORKDIR /app

COPY package*.json ./
COPY prisma/* ./prisma
RUN npm install
RUN apt-get update -y && \
     apt-get install -y openssl &&\
    npm install -g @nestjs/cli

COPY .env .env
COPY . .
RUN npm run build

# Étape 2 : Image de production
FROM node:slim

WORKDIR /app
RUN apt-get update -y && \
     apt-get install -y openssl &&\
    npm install -g @nestjs/cli
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma/* ./prisma
RUN npm install --production
COPY --from=builder /app/dist ./dist

# Démarre l'application
CMD ["node", "dist/src/main.js"]