import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { AllExceptionsFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const logger = new Logger('Application');

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  // Глобальний перехоплювач помилок
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(8000);
  logger.log(`Application started on port 8000`);
}
bootstrap();
