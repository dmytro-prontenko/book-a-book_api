import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BookModule } from '@app/book/book.module';
import { LoggerMiddleware } from '@app/middleware/logger.middleware';
import orm_config from '@app/orm_config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [BookModule, TypeOrmModule.forRoot(orm_config)],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
