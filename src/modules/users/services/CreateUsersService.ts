import IUserRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import IUserDTO from '../dto/IUserDTO';

import AppError from '../../../shared/errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  constructor(private usersRepository: IUserRepository, private hashProvider: IHashProvider) {}

  public async execute({ name, email, password }: Request): Promise<IUserDTO> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('The email address has already been used !');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    const userDTO = {
      name: user.name,
      email: user.email,
    };

    return userDTO;
  }
}

export default CreateUserService;
