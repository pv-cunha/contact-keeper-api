import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import UsersRepository from '../../db/repository/UsersRepository';
import BCryptHashProvider from '../../../providers/HashProvider/implementations/BCryptHashProvider';
import AuthenticateUserService from '../../../services/AuthenticateUserService';

const usersRepository = new UsersRepository();
const bCryptHashProvider = new BCryptHashProvider();
const authenticateUserService = new AuthenticateUserService(usersRepository, bCryptHashProvider);

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const { email, password } = request.body;

    const { user, token } = await authenticateUserService.execute({
      email,
      password,
    });

    return response.json({ user, token });
  }
}
