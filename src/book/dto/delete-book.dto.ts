import { IsArray, IsNumber, IsNotEmpty, ArrayMinSize } from 'class-validator';

export class DeleteBooksDto {
  @IsArray()
  @IsNotEmpty({ message: 'Масив ідентифікаторів не може бути порожнім' })
  @ArrayMinSize(1, {
    message: 'Потрібно вказати хоча б один ідентифікатор книги',
  })
  @IsNumber({}, { each: true, message: 'Кожен елемент масиву має бути числом' })
  ids: number[];
}
