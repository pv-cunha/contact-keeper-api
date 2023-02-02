import { sign } from 'jsonwebtoken';

import { IUser } from '../infra/db/models/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import AppError from '../../../shared/errors/AppError';
import authConfig from '../../../config/auth';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: IUser;
  token: string;
}

class AuthenticateUserService {
  constructor(private usersRepository: IUsersRepository, private hashProvider: IHashProvider) {}

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination !', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination !', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user._id.toString(),
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
