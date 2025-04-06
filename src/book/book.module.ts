import { Module } from '@nestjs/common';
import { BookService } from '@app/book/book.service';
import { BookController } from '@app/book/book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from '@app/book/entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
