import { UserEntity } from '@app/user/entities/user.entity';

export interface IUserResponse {
  message: string;
  user: Pick<
    UserEntity,
    'id' | 'firstName' | 'lastName' | 'email' | 'role' | 'isBlocked'
  > & { token: string };
  //АБО
  // user: Omit<
  //   UserEntity,
  //   'created_at' | 'updated_at' | 'hashPassword' | 'password'
  // > & {
  //   token: string;
  // };
}
