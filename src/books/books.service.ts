import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}
  create(dto: CreateBookDto) {
    return this.prisma.bookBase.create({ data: dto });
  }

  findAll() {
    return this.prisma.bookBase.findMany();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} book`;
  // }
  //
  // update(id: number, updateBookDto: UpdateBookDto) {
  //   return `This action updates a #${id} book`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} book`;
  // }
}
