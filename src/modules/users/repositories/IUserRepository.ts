import ICreateUserDTO from '../dto/ICreateUserDTO';
import { IUser } from '../infra/db/models/User';

export default interface IUserRepository {
  create: (data: ICreateUserDTO) => Promise<IUser>;
  save: (user: IUser) => Promise<IUser>;
  findById: (id: String) => Promise<IUser | undefined>;
  findByEmail: (email: String) => Promise<IUser | undefined>;
}
