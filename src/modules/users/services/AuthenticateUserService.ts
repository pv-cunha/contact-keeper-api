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
    const userByEmail = await this.usersRepository.findByEmail(email);

    if (!userByEmail) {
      throw new AppError('Incorrect email/password combination !', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(password, userByEmail.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination !', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: userByEmail.id,
      expiresIn,
    });

    const user = {
      name: userByEmail.name,
      email: userByEmail.email,
    };

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
