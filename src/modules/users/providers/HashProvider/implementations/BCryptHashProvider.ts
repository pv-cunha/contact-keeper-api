import { hash, genSalt, compare } from 'bcryptjs';

import IHashProvider from '../models/IHashProvider';

export default class BCryptHashProvider implements IHashProvider {
  public async generateHash(password: string): Promise<string> {
    const salt = await genSalt(8);

    const hashedPassword = await hash(password, salt);

    return hashedPassword;
  }

  public async compareHash(password: string, hashedPassword: string): Promise<boolean> {
    const passwordMatched = await compare(password, hashedPassword);

    return passwordMatched;
  }
}
