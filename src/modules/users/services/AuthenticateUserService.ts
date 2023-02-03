import { sign } from 'jsonwebtoken';

import IUserDTO from '../dto/IUserDTO';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import AppError from '../../../shared/errors/AppError';
import authConfig from '../../../config/auth';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: IUserDTO;
  token: string;
}

class AuthenticateUserService {
  constructor(private usersRepository: IUsersRepository, private hashProvider: IHashProvider) {}

  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = await this.usersRepository.findByEmail(email);

    if (!userRepository) {
      throw new AppError('Incorrect email/password combination !', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(password, userRepository.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination !', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: userRepository._id.toString(),
      expiresIn,
    });

    const user = {
      name: userRepository.name,
      email: userRepository.email,
    };

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
