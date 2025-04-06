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
  total_pages: number | null;
  current_page: number | null;
  per_page: number | null;
  books: IBook[];
}
