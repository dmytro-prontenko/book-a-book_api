import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Видаляє поля, які не визначені у DTO
      forbidNonWhitelisted: true, // Забороняє запити з полями, не визначеними у DTO
      transform: true, // Автоматично трансформує прості типи
    }),
  );

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
