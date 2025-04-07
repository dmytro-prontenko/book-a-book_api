import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from '@app/filters/http-exception.filter';
import * as dotenv from 'dotenv';
dotenv.config(); // Завантажуємо змінні середовища з .env файлу

async function bootstrap() {
  const logger = new Logger('Application');

  // Умовний імпорт з використанням динамічного ES-модуля замість require
  if (!process.env.IS_TS_NODE) {
    await import('module-alias/register');
  }

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  app.setGlobalPrefix('api');

  // Глобальний перехоплювач помилок
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe());

  // console.log('Environment variables check:');
  // console.log(`NODE_ENV: ${process.env.NODE_ENV || 'not set'}`);
  // console.log(`JWT_SECRET: ${process.env.JWT_SECRET ? 'exists' : 'not set'}`);
  // console.log(`ROLE_CODE: ${process.env.ROLE_CODE ? 'exists' : 'not set'}`);

  await app.listen(8000);
  logger.log(`Application started on port 8000`);
}
bootstrap();
