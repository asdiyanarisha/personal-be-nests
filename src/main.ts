import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  console.log(__dirname + '/entities/**/*{.ts,.js}');
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const configService = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  app.use('/storage', express.static(join(process.cwd(), './uploads/')));

  await app.listen(configService.get('port') ?? 3000);
}

bootstrap();
