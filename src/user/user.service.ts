import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from '@app/user/dto/create-user.dto';
import { UpdateUserDto } from '@app/user/dto/update-user.dto';
import { UserEntity } from '@app/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import * as process from 'node:process';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);
    return this.userRepository.save(newUser);
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

  buildUserResponse(user: UserEntity): any {
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
