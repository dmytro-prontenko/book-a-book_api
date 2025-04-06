import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { Logger } from '@nestjs/common';
import { AllExceptionsFilter } from '@app/filters/http-exception.filter';

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

  await app.listen(8000);
  logger.log(`Application started on port 8000`);
}
bootstrap();
