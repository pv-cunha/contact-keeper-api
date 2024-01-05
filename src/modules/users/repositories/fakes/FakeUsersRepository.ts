import { v4 } from 'uuid';

import ICreateUserDTO from '../../dto/ICreateUserDTO';
import IUserRepository from '../IUsersRepository';

import { User } from '../../infra/db/models/User';

class FakeUsersRepository implements IUserRepository {
  private users: User[] = [];

  public async findById(id: String): Promise<User | undefined> {
    const findUser = this.users.find((user) => user.id === id);

    return findUser;
  }

  public async findByEmail(email: String): Promise<User | undefined> {
    const findUser = this.users.find((user) => user.email === email);

    return findUser;
  }

  public async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user: User = {
      id: v4(),
      name,
      email,
      password,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.users.push(user);

    return user as User;
  }

  public async save(user: User): Promise<User> {
    const findUserIndex = this.users.findIndex((findUser) => findUser.id === user.id);

    this.users[findUserIndex] = user;

    return user;
  }
}

export default FakeUsersRepository;
