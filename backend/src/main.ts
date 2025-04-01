import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as express from 'express';
import { join } from 'path';
import * as process from 'node:process';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
    cors: {
      origin: '*',
      methods: 'GET, POST, PUT, DELETE, OPTIONS',
      allowedHeaders: 'Content-Type, Authorization',
    },
  });
  app.use(helmet());
  const config = new DocumentBuilder()
    .setTitle('Localbalzaar API')
    .setDescription('The localbalzaar API description')
    .setVersion('1.0')
    .addTag('localbalzaar')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.use('/', express.static(join(process.cwd(), 'public', 'uploads')));

  await app.listen(process.env.APP_PORT ? Number(process.env.APP_PORT) : 3000);
}
void bootstrap();
