import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: '[author] - Автор не може бути порожнім' })
  @MinLength(3, {
    message: '[author] - Мінімальна довжина для автора 3 символи',
  })
  @MaxLength(100, {
    message: '[author] - Максимальна довжина для назви 100 символів',
  })
  author: string;

  @IsString()
  @IsNotEmpty({ message: '[firstName] - Імʼя не може бути порожнім' })
  @MinLength(3, {
    message: '[firstName] - Мінімальна довжина для імені 3 символи',
  })
  @MaxLength(100, {
    message: '[firstName] - Максимальна довжина для імені 100 символів',
  })
  firstName: string;

  @IsString()
  @IsNotEmpty({ message: '[lastName] - Прізвище не може бути порожнім' })
  @MinLength(3, {
    message: '[lastName] - Мінімальна довжина для прізвища 3 символи',
  })
  @MaxLength(100, {
    message: '[lastName] - Максимальна довжина для прізвища 100 символів',
  })
  lastName: string;

  @IsString()
  email: string;
}
