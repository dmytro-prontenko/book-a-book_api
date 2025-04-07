import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BookService } from '@app/book/book.service';
import { CreateBookDto } from '@app/book/dto/create-book.dto';
import { UpdateBookDto } from '@app/book/dto/update-book.dto';
import { DeleteBooksDto } from '@app/book/dto/delete-book.dto';
import { IAllBookResponse } from './interfaces/bookResponse.interface';

@Controller('books')
export class BookController {
  private readonly logger = new Logger(BookController.name);
  constructor(private readonly bookService: BookService) {}

  @Get()
  async findAll(): Promise<IAllBookResponse> {
    const response = await this.bookService.findAll();
    return {
      total_books: response.length,
      total_pages: null,
      current_page: null,
      per_page: null,
      books: response,
    };
  }

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get('book/:id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @Patch('book/:id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }

  @Delete()
  remove(@Body() deleteDto: DeleteBooksDto) {
    return this.bookService.remove(deleteDto.ids);
  }
}
