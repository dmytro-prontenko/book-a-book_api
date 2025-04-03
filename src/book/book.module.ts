import { Module } from '@nestjs/common';
import { BookService } from '@app/book/book.service';
import { BookController } from '@app/book/book.controller';
import { PrismaService } from '@app/prisma.service';

@Module({
  controllers: [BookController],
  providers: [BookService, PrismaService],
})
export class BookModule {}
