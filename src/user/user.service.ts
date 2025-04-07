import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from '@app/user/dto/create-user.dto';
import { UpdateUserDto } from '@app/user/dto/update-user.dto';
import { UserEntity } from '@app/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { IUserResponse } from '@app/user/interfaces/userResponse.interface';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const checkUserExists = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (checkUserExists)
      throw new HttpException(
        'Користувач вже зареєстрований',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    try {
      const newUser = new UserEntity();

      // Видаляємо secretCode з об'єкту перед тим, як копіювати властивості
      const { secretCode, ...userData } = createUserDto;

      Object.assign(newUser, userData);

      // Перевіряємо secretCode і встановлюємо роль librarian, якщо він відповідає константі
      if (secretCode === process.env.ROLE_CODE) {
        newUser.role = 'librarian';
      }

      return await this.userRepository.save(newUser);
    } catch (error) {
      this.logger.error(`Error creating user: ${error.message}`, error.stack);
      throw error;
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  generateJwt(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isBlocked: user.isBlocked,
        created_at: user.created_at,
      },
      process.env.JWT_SECRET,
    );
  }

  buildUserResponse(user: UserEntity): IUserResponse {
    const { id, firstName, lastName, email, role, isBlocked } = user;
    return {
      message: 'User was successfully created!',
      user: {
        id,
        firstName,
        lastName,
        email,
        role,
        isBlocked,
        token: this.generateJwt(user),
      },
    };
  }
}
