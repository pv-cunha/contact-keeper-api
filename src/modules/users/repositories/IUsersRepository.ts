import ICreateUserDTO from '../dto/ICreateUserDTO';
import { User } from '../infra/db/models/User';

export default interface IUserRepository {
  create: (data: ICreateUserDTO) => Promise<User>;
  save: (user: User) => Promise<User>;
  findById: (id: string) => Promise<User | undefined>;
  findByEmail: (email: string) => Promise<User | undefined>;
}
