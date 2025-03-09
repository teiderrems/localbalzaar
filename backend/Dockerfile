FROM node:latest

RUN apt update && \
npm install -g @nestjs/cli

WORKDIR /app
EXPOSE 3000
EXPOSE 8080

COPY *.json ./
COPY prisma ./

RUN npm install
COPY . .
VOLUME [ "./:/app" ]
ENTRYPOINT [ "npm","run","start" ]