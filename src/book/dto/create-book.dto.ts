import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty({ message: '[title] - Назва не може бути порожньою' })
  @MinLength(3, { message: '[title] - Мінімальна довжина для назви 3 символи' })
  @MaxLength(255, {
    message: '[title] - Максимальна довжина для назви 255 символів',
  })
  title: string;

  @IsString()
  @IsNotEmpty({ message: '[author] - Автор не може бути порожнім' })
  @MinLength(3, {
    message: '[author] - Мінімальна довжина для автора 3 символи',
  })
  @MaxLength(100, {
    message: '[author] - Максимальна довжина для назви 100 символів',
  })
  author: string;

  @IsNumber()
  @Min(1900, { message: '[year] - Рік не можу бути меншим 1900' })
  @Max(new Date().getFullYear(), {
    message: () =>
      `[year] - Рік не може бути більшим за ${new Date().getFullYear()}`,
  })
  year: number;

  @IsString()
  @IsNotEmpty({ message: '[category] - Категорія не може бути порожньою' })
  @MinLength(3, {
    message: '[category] - Мінімальна довжина для категорії 3 символи',
  })
  @MaxLength(100, {
    message: '[category] - Максимальна довжина для категорії 100 символів',
  })
  category: string;

  @IsString()
  @IsNotEmpty({ message: '[language] - Мова книжки не може бути порожньою' })
  @MinLength(3, {
    message: '[language] - Мінімальна довжина для мови 3 символи',
  })
  @MaxLength(50, {
    message: '[language] - Максимальна довжина для мови 50 символів',
  })
  language: string;

  @IsString()
  @IsNotEmpty({ message: '[description] - Опис книжки не може бути порожньою' })
  @MinLength(3, {
    message: '[description] - Мінімальна довжина для опису 50 символів',
  })
  @MaxLength(3000, {
    message: '[description] - Максимальна довжина для мови 3000 символів',
  })
  description: string;

  @IsString()
  @IsNotEmpty({ message: "[cover_image] - Обкладинка книжки обов'язкова" })
  cover_image: string;
}
