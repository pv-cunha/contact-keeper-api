import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import UsersRepository from '../../db/repository/UsersRepository';
import CreateUserService from '../../../services/CreateUsersService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = request.body;

    const createUser = new CreateUserService(new UsersRepository());

    const user = await createUser.execute({ name, email, password });

    return response.json({ user });
  }
}
