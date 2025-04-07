import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
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
  @IsEmail({}, { message: '[email] - Некоректний формат електронної пошти' })
  @IsNotEmpty({ message: '[email] - Email не може бути порожнім' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: '[password] - Пароль не може бути порожнім' })
  @MinLength(6, {
    message: '[password] - Мінімальна довжина для пароля 6 символів',
  })
  password: string;

  @IsString()
  @IsOptional()
  secretCode?: string;
}
