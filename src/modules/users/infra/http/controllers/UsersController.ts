import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import UsersRepository from '../../db/repository/UsersRepository';
import BCryptHashProvider from '../../../providers/HashProvider/implementations/BCryptHashProvider';
import CreateUserService from '../../../services/CreateUsersService';

const usersRepository = new UsersRepository();
const bCryptHashProvider = new BCryptHashProvider();

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = request.body;

    const createUser = new CreateUserService(usersRepository, bCryptHashProvider);

    const user = await createUser.execute({ name, email, password });

    return response.status(200).json({ user });
  }
}
