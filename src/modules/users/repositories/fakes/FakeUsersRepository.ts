import { v4 } from 'uuid';

import ICreateUserDTO from '../../dto/ICreateUserDTO';
import IUserRepository from '../IUsersRepository';

import { IUser, User } from '../../infra/db/models/User';

class FakeUsersRepository implements IUserRepository {
  private users: IUser[] = [];

  public async findById(id: String): Promise<IUser | undefined> {
    const findUser = this.users.find((user) => user._id.toString() === id);

    return findUser;
  }

  public async findByEmail(email: String): Promise<IUser | undefined> {
    const findUser = this.users.find((user) => user.email === email);

    return findUser;
  }

  public async create({ name, email, password }: ICreateUserDTO): Promise<IUser> {
    const user = new User();

    Object.assign(user, {
      _id: v4(),
      name,
      email,
      password,
      date: new Date(),
    });

    this.users.push(user);

    return user as IUser;
  }

  public async save(user: IUser): Promise<IUser> {
    const findUserIndex = this.users.findIndex((findUser) => findUser._id.toString() === user._id.toString());

    this.users[findUserIndex] = user;

    return user;
  }
}

export default FakeUsersRepository;
