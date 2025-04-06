import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from '@app/book/dto/create-book.dto';

import { UpdateBookDto } from '@app/book/dto/update-book.dto';
import { BookEntity } from '@app/book/entities/book.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BookService {
  private readonly logger = new Logger(BookService.name);

  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,
  ) {}

  async create(dto: CreateBookDto): Promise<BookEntity> {
    this.logger.log('Створення нової книги');
    try {
      const book = this.bookRepository.create(dto);

      const savedBook = await this.bookRepository.save(book);

      this.logger.debug(`Створено книгу з ID ${savedBook.id}`);
      return savedBook;
    } catch (error) {
      this.logger.error(
        `Помилка створення книги: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async findAll(): Promise<BookEntity[]> {
    this.logger.log('Отримання всіх книг');
    try {
      const books = await this.bookRepository.find({
        order: {
          id: 'DESC',
        },
      });
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

  async findOne(id: number): Promise<BookEntity> {
    this.logger.log(`Отримання книги з ID ${id}`);
    try {
      const book = await this.bookRepository.findOne({ where: { id } });

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

  async update(id: number, dto: UpdateBookDto): Promise<BookEntity> {
    this.logger.log(`Оновлення книги з ID ${id}`);
    try {
      // Перевіряємо, чи існує книга
      const existingBook = await this.bookRepository.findOne({ where: { id } });

      if (!existingBook) {
        throw new NotFoundException(`Книгу з ID ${id} не знайдено`);
      }

      // Оновлюємо книгу
      await this.bookRepository.update(id, dto);

      // Отримуємо оновлену книгу
      const updatedBook = await this.bookRepository.findOne({ where: { id } });

      if (!updatedBook) {
        throw new NotFoundException(
          `Книгу з ID ${id} не знайдено після оновлення`,
        );
      }

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

  async remove(ids: number[]): Promise<BookEntity[]> {
    this.logger.log(`Видалення книг з ID: ${ids.join(', ')}`);
    try {
      const result: BookEntity[] = [];

      for (const id of ids) {
        // Перевіряємо, чи існує книга
        const book = await this.findOne(id); // Це викине NotFoundException, якщо книги не існує

        // Видаляємо книгу
        await this.bookRepository.remove(book);

        this.logger.debug(`Видалено книгу з ID ${id}`);
        result.push(book);
      }

      return result;
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        this.logger.error(
          `Помилка видалення книг: ${error.message}`,
          error.stack,
        );
      }
      throw error;
    }
  }
}
