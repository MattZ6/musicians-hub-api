import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

export const USERS_REPOSITORY_INDENTIFIER = 'UsersRepository';

export default interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  update(data: User): Promise<User>;
  findById(id: string): Promise<User | undefined>;
  findByNickName(nick: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
}
