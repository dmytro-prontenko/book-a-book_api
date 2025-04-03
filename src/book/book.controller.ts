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

@Controller('books')
export class BookController {
  private readonly logger = new Logger(BookController.name);
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get()
  async findAll() {
    this.logger.log('Request to get all book');
    return await this.bookService.findAll();
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
