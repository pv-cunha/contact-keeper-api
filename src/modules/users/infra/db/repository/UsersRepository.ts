import { prismaClient } from '../../../../../config/prismaClient';

import IUserRepository from '../../../repositories/IUsersRepository';
import ICreateUserDTO from '../../../dto/ICreateUserDTO';

import { User } from '../models/User';
class UsersRepository implements IUserRepository {

  public async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password
      }
    })

    return user;
  }

  public async save(user: User): Promise<User> {
    await prismaClient.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: user.name,
        email: user.email,
        password: user.password
      }
    });

    return user;
  }

  public async findById(id: string): Promise<User> {
    const user = await prismaClient.user.findUnique({
      where: {
        id
      }
    });

    return user as User;
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await prismaClient.user.findUnique({
      where: {
        email
      }
    });

    return user as User;
  }
}

export default UsersRepository;
