import { IBook } from '@app/book/interfaces/book.interface';

export interface IAllBookResponse {
  total_books: number;
  total_pages: number | null;
  current_page: number | null;
  per_page: number | null;
  books: IBook[];
}
