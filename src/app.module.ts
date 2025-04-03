import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BookModule } from '@app/book/book.module';
import { LoggerMiddleware } from '@app/middleware/logger.middleware';

@Module({
  imports: [BookModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
