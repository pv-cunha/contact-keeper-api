import { Request, Response } from 'express';

export default class AuthenticateController {
  public async show(request: Request, response: Response): Promise<Response> {
    return response.status(200).json({ auth: true });
  }
}
