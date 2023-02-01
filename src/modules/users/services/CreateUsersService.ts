import IUserRepository from '../repositories/IUserRepository';
import { IUser } from '../infra/db/models/User';

import AppError from '../../../shared/errors/AppError';

interface Request {
  name: String;
  email: String;
  password: String;
}

class CreateUserService {
  constructor(private usersRepository: IUserRepository) {}

  public async execute({ name, email, password }: Request): Promise<IUser> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('The email address has already been used !');
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password,
    });

    return user;
  }
}

export default CreateUserService;
