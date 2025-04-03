import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from '@app/book/dto/create-book.dto';
import { PrismaService } from '@app/prisma.service';
import { UpdateBookDto } from '@app/book/dto/update-book.dto';

@Injectable()
export class BookService {
  private readonly logger = new Logger(BookService.name);

  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBookDto) {
    this.logger.log('Створення нової книги');
    try {
      const book = await this.prisma.book.create({ data: dto });
      this.logger.debug(`Створено книгу з ID ${book.id}`);
      return book;
    } catch (error) {
      this.logger.error(
        `Помилка створення книги: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async findAll() {
    this.logger.log('Отримання всіх книг');
    try {
      const books = await this.prisma.book.findMany();
      this.logger.debug(`Знайдено ${books.length} книг`);
      return books;
    } catch (error) {
      this.logger.error(
        `Помилка отримання книг: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async findOne(id: number) {
    this.logger.log(`Отримання книги з ID ${id}`);
    try {
      const book = await this.prisma.book.findUnique({
        where: { id },
      });

      if (!book) {
        this.logger.warn(`Книгу з ID ${id} не знайдено`);
        throw new NotFoundException(`Книгу з ID ${id} не знайдено`);
      }

      this.logger.debug(`Знайдено книгу з ID ${id}`);
      return book;
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        this.logger.error(
          `Помилка отримання книги ${id}: ${error.message}`,
          error.stack,
        );
      }
      throw error;
    }
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    this.logger.log(`Оновлення книги з ID ${id}`);
    try {
      // Перевіряємо, чи існує книга
      await this.findOne(id); // Це викине NotFoundException, якщо книги не існує

      // Якщо ми дійшли сюди, книга існує, тож оновлюємо її
      const updatedBook = await this.prisma.book.update({
        where: { id },
        data: updateBookDto,
      });

      this.logger.debug(`Оновлено книгу з ID ${id}`);
      return updatedBook;
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        this.logger.error(
          `Помилка оновлення книги ${id}: ${error.message}`,
          error.stack,
        );
      }
      throw error;
    }
  }

  async remove(ids: number[]) {
    const result: any = [];
    for (const id of ids) {
      try {
        // Перевіряємо, чи існує книга
        await this.findOne(id); // Це викине NotFoundException, якщо книги не існує

        // Якщо ми дійшли сюди, книга існує, тож видаляємо її
        const deletedBook = await this.prisma.book.delete({
          where: { id },
        });

        this.logger.debug(`Видалено книгу з ID ${id}`);
        result.push(deletedBook);
      } catch (error) {
        if (!(error instanceof NotFoundException)) {
          this.logger.error(
            `Помилка видалення книги ${id}: ${error.message}`,
            error.stack,
          );
        }
        throw error;
      }
    }
    return result;
  }
}
