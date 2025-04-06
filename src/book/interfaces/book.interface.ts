export interface IBook {
  id: number;
  title: string;
  author: string;
  year: number;
  category: string;
  language: string;
  description: string;
  cover_image: string;
  status: string;
  average_rating: number;
  created_at: string;
  updated_at: string;
}

export interface IAllBookResponse {
  total_books: number;
  books: IBook[];
}
